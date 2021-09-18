import JsCID from 'cids';
import {
	EnumTypeofCID,
} from '../index';
import { _isCIDLike, _isArrayLike } from './util';
import { ITSPickExtra, ITSRequireAtLeastOne } from 'ts-type';
import err_code from 'err-code';
import { getCodeFromName, getNameFromCode } from 'multicodec';

export const SymbolJsCID = Symbol.for(EnumTypeofCID.js_cids);

export type IRawJsCID = ITSRequireAtLeastOne<ITSPickExtra<JsCID, 'version' | 'multihash' | 'codec' | 'code', 'multibaseName'>, 'codec' | 'code'>;

export function isRawJsCIDLike<T extends IRawJsCID = IRawJsCID>(cid: T | unknown): cid is T
{
	return _isCIDLike(cid) && (typeof cid.codec === 'string' || typeof cid.code === 'number') && _isArrayLike(cid.multihash)
}

export function isJsCID<T extends JsCID = JsCID>(cid: unknown): cid is T
{
	return (cid?.[SymbolJsCID] === true) && isRawJsCIDLike<JsCID>(cid) && typeof cid.toV1 === 'function'
}

export function assertJsCID<T extends JsCID = JsCID>(cid: any): asserts cid is T
{
	if (!isJsCID(cid))
	{
		throw err_code(new TypeError(`CID is not '${EnumTypeofCID.js_cids}'`), {
			input: cid,
		})
	}
}

export function toRawJsCID(cid: IRawJsCID): IRawJsCID
{
	let { version, codec, code, multihash } = cid;

	// @ts-ignore
	code ??= getCodeFromName(codec);
	// @ts-ignore
	codec ??= getNameFromCode(code);

	return {
		version,
		codec,
		code,
		multihash,
	}
}

export type IRawJsCIDFake<T extends IRawJsCID = IRawJsCID> = T
	& {
	[SymbolJsCID]?: true
}

export function toRawJsCIDFake(cid: IRawJsCID): IRawJsCIDFake
{
	const value: IRawJsCIDFake = toRawJsCID(cid)

	value[SymbolJsCID] = true;

	return value
}
