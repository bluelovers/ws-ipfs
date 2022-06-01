import { _invalidPath } from './util';
import err_code from 'err-code';
import {
	IParsePathResult,
	IParsePathResultNsInput,
	IParsePathResultNsInputToEnum,
	IParsePathResultPath,
	IParsePathResultPathInput,
	IParsePathResultStrict,
} from './types';
//import { toCID } from '@lazy-ipfs/to-cid';
import { cid as is_cid } from 'is-ipfs';
import { _assertCID } from '@lazy-ipfs/is-cid';

export function assertToParsePathResultPath<P extends IParsePathResultPathInput>(path: P | unknown): asserts path is IParsePathResultPath<P>
{
	let bool = false;
	if (typeof path === 'string')
	{
		if (_invalidPath(path))
		{
			bool = true;
		}
	}
	else if (typeof path !== 'undefined' && path !== null)
	{
		bool = true;
	}

	if (bool)
	{
		throw err_code(new TypeError(`Invalid path: ${path}`), {
			path,
		})
	}
}

export const enum EnumParsePathResultNs
{
	'ipfs' = 'ipfs',
	'ipns' = 'ipns',
}

export function assertToEnumNs<N extends IParsePathResultNsInput>(ns: N | unknown): asserts ns is IParsePathResultNsInputToEnum<N>
{
	// @ts-ignore
	if (EnumParsePathResultNs[ns] !== ns)
	{
		throw err_code(new TypeError(`Invalid ns: ${ns}`), {
			ns,
		})
	}
}

export function assertToParsePathResult<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P | string, N | string>): asserts result is IParsePathResultStrict<H, IParsePathResultPath<P>, IParsePathResultNsInputToEnum<N>>
{
	assertToEnumNs(result.ns);

	if (result.ns !== EnumParsePathResultNs.ipns)
	{
		try
		{
			_assertCID(result.hash)
		}
		catch (e)
		{
			throw err_code(e, {
				result,
			})
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
