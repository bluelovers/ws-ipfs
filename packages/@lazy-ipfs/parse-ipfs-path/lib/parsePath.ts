import isValidDomain from 'is-valid-domain';
import { isCID, toCID, strToCidToStr } from '@lazy-ipfs/to-cid';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { _isArrayLike } from '@lazy-ipfs/detect-cid-lib/lib/util';
import cidToString from '@lazy-ipfs/cid-to-string/index';

export { strToCidToStr }

export const enum EnumParsePathResultNs
{
	'ipfs' = 'ipfs',
	'ipns' = 'ipns',
}

export type IParsePathResultNsInput = 'ipfs' | 'ipns' | EnumParsePathResultNs;

export type IParsePathResultNsInputToEnum<T extends string> = T extends 'ipfs'
	? EnumParsePathResultNs.ipfs
	: T extends 'ipns'
		? EnumParsePathResultNs.ipns
		: T extends EnumParsePathResultNs
			? T
			: T extends string
				? EnumParsePathResultNs
				: never
	;

export type IParsePathResultPathInput = string;

export type IParsePathResultPath<P> = P extends null ? ''
	: P extends undefined ? ''
		: P extends void ? ''
			: P extends never ? ''
				: P
	;

export interface IParsePathResult<H extends string = string, P extends IParsePathResultPathInput = string, N extends string | IParsePathResultNsInput = IParsePathResultNsInput>
{
	ns: N;
	hash: H;
	path?: P;
}

export interface IParsePathResultStrict<H extends string = string, P extends IParsePathResultPathInput = string, N extends IParsePathResultNsInput = IParsePathResultNsInput> extends Omit<IParsePathResult<H, P, N>, 'path' | 'ns'>
{
	ns: IParsePathResultNsInputToEnum<N>;
	path: IParsePathResultPath<P>;
}

export type IParsePathInputValue = ICIDValue | Uint8Array;

/**
 * @see https://github.com/tableflip/dweb-path
 */
export function parsePathCore<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue): IParsePathResultStrict<H, P, N>
{
	let ns: EnumParsePathResultNs, hash: string, path: string

	if (Buffer.isBuffer(input) || _isArrayLike(input) || isCID(input))
	{
		hash = cidToString(toCID(input));

		ns = EnumParsePathResultNs.ipfs
		path = ''
	}
	else if (typeof input === 'string' || Object.prototype.toString.call(input) === '[object String]')
	{
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
					throw err
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
				throw new TypeError(`Unknown namespace: ${parts[1]}`)
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
	else
	{
		throw new TypeError(`Invalid input: ${input}`) // What even is this?
	}

	return {
		ns,
		hash,
		path,
	} as null
}

export function parsePath<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue, options?: {
	noThrow?: boolean,
	unsafeReturn?: boolean,
}): IParsePathResultStrict<H, P, N>
{
	try
	{
		return parsePathCore(input)
	}
	catch (e)
	{
		if (!options?.noThrow)
		{
			throw e
		}
	}

	if (options?.unsafeReturn)
	{
		return {
			ns: EnumParsePathResultNs.ipfs,
			hash: input,
			path: '',
		} as null
	}
}

export function assertToEnumNs<N extends IParsePathResultNsInput>(ns: N | unknown): asserts ns is IParsePathResultNsInputToEnum<N>
{
	// @ts-ignore
	if (EnumParsePathResultNs[ns] !== ns)
	{
		throw new TypeError(`Invalid ns: ${ns}`)
	}
}

export function assertToParsePathResultPath<P extends IParsePathResultPathInput>(path: P | unknown): asserts path is IParsePathResultPath<P>
{
	if (typeof path === 'string' && path.length)
	{
		if (path[0] !== '/' || path.length < 2)
		{
			throw new TypeError(`Invalid path: ${path}`)
		}
	}
	else if (path !== '' && typeof path !== 'undefined' && path !== null)
	{
		throw new TypeError(`Invalid path: ${path}`)
	}
}

export function assertToParsePathResult<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P | string, N | string>): asserts result is IParsePathResultStrict<H, IParsePathResultPath<P>, IParsePathResultNsInputToEnum<N>>
{
	assertToEnumNs(result.ns);

	if (result.ns !== EnumParsePathResultNs.ipns)
	{
		try
		{
			toCID(result.hash)
		}
		catch (e)
		{
			throw new TypeError(`Invalid hash: ${result.hash}`)
		}
	}

	assertToParsePathResultPath(result.path)
}

export function isParsePathResult<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P | string, N | string> | unknown): result is IParsePathResultStrict<H, IParsePathResultPath<P>, IParsePathResultNsInputToEnum<N>>
{
	try
	{
		assertToParsePathResult(result as any);

		return true
	}
	catch (e)
	{

	}

	return false
}

export function resultToPath<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P, N>): `/${IParsePathResultNsInputToEnum<N>}/${H}${IParsePathResultPath<P>}`
{
	assertToParsePathResult(result);

	return `/${result.ns}/${result.hash}${result.path ?? ''}` as null
}

