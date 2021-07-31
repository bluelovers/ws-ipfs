import { _invalidInput } from './_invalidInput';
import err_code from 'err-code';
import { LazyURL } from 'lazy-url';
import { _isStringObject, isParsePathResultLoose } from './util';
import { _handleFromURL } from './_handleFromURL';
import { isCID, strToCidToStr, toCID } from '@lazy-ipfs/to-cid';
import isValidDomain from 'is-valid-domain';
import { _isArrayLike } from '@lazy-ipfs/detect-cid-lib/lib/util';
import cidToString from '@lazy-ipfs/cid-to-string/index';
import { assertToParsePathResult, assertToParsePathResultPath, EnumParsePathResultNs } from './asserts';
import { IParsePathInputValue, IParsePathResultPathInput, IParsePathResultStrict } from './types';
import { _url_href } from '@lazy-ipfs/is-cid/index';

/**
 * @see https://github.com/tableflip/dweb-path
 */
export function _parsePathCore<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue): IParsePathResultStrict<H, P, N>
{
	const originalInput = input;

	let ns: EnumParsePathResultNs, hash: string, path: string

	if (_invalidInput(input))
	{
		// dummy
	}
	else if (typeof input === 'string' || _isStringObject(input) || input instanceof URL)
	{
		input = _url_href(input as any) as string;

		// @ts-ignore
		input = _handleFromURL(input) ?? input;

		if (typeof input !== 'string')
		{
			return input as any;
		}

		// Ensure leading slash
		if (input[0] !== '/')
		{
			input = `/${input}`
		}

		// Remove trailing slash
		if (input[input.length - 1] === '/')
		{
			input = input.slice(0, -1)
		}

		const parts = input.split('/')

		if (parts[1] === EnumParsePathResultNs.ipfs || parts[1] === EnumParsePathResultNs.ipns)
		{
			try
			{
				hash = strToCidToStr(parts[2])
			}
			catch (err)
			{
				// If IPNS then this could be a domain name
				if (parts[1] === EnumParsePathResultNs.ipns && isValidDomain(parts[2]))
				{
					hash = parts[2]
				}
				else
				{
					throw err_code(err, {
						originalInput,
						input,
						parts,
					})
				}
			}

			ns = parts[1]
			path = parts.slice(3).join('/')
		}
		else
		{
			// Is parts[1] a CID?
			try
			{
				hash = strToCidToStr(parts[1])
			}
			catch (err)
			{
				throw err_code(new TypeError(`Unknown namespace: ${parts[1]}`), {
					originalInput,
					input,
					parts,
				})
			}

			ns = EnumParsePathResultNs.ipfs
			path = parts.slice(2).join('/')
		}

		// Ensure leading slash on non empty path
		if (path.length)
		{
			path = `/${path}`
		}
	}
	else if (isParsePathResultLoose(input))
	{
		assertToParsePathResult(input)

		return input as any;
	}
	else if (Buffer.isBuffer(input) || _isArrayLike(input) || isCID(input))
	{
		hash = cidToString(toCID(input));

		ns = EnumParsePathResultNs.ipfs
		path = ''
	}

	if (!ns?.length || !hash?.length)
	{
		throw err_code(new TypeError(`Invalid input: ${input}`), {
			originalInput,
			input,
		})
	}

	assertToParsePathResultPath(path);

	return {
		ns,
		hash,
		path,
	} as null
}

export function parsePathCore<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue): IParsePathResultStrict<H, P, N>
{
	try
	{
		const ret = _parsePathCore<H, P, N>(input);

		assertToParsePathResult(ret);

		return ret;
	}
	catch (e)
	{
		throw err_code(e, {
			originalInput: input,
		})
	}
}
