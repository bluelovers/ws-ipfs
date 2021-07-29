import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';

export const enum EnumTypeofCID
{
	js_cid = '@ipld/js-cid/CID',
	multiformats_cid = '@ipld/js-multiformats/CID',
}

export const SymbolJsCID = Symbol.for(EnumTypeofCID.js_cid);

/**
 * @deprecated this is not exists
 * @see https://github.com/multiformats/js-multiformats/pull/109
 */
export const SymbolMultiformatsCID = Symbol.for(EnumTypeofCID.multiformats_cid);

export function _isArrayLike<T extends Pick<any[], number | 'length'>>(input: any): input is T
{
	const type = typeof input;

	return Array.isArray(input) || type !== 'function' && type !== 'string' && typeof input?.length === 'number' && typeof input.forEach === 'function' && typeof input.slice === 'function';
}

export function _isCIDLike(cid: JsCID | MultiformatsCID)
{
	return typeof cid?.version === 'number' && typeof cid.multihash !== 'undefined'
}

export type ICID = JsCID | MultiformatsCID;

export function isJsCID<T extends JsCID = JsCID>(cid: any): cid is T
{
	return (cid[SymbolJsCID] === true) && _isArrayLike<Uint8Array>((cid as any as JsCID).multihash)
}

export function isMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: any): cid is T
{
	return !isJsCID(cid) && _isArrayLike((cid as any as MultiformatsCID).bytes) && !_isArrayLike<Uint8Array>((cid as any as MultiformatsCID).multihash)
}

export function typeofCID(cid: any)
{
	if (isJsCID(cid))
	{
		return EnumTypeofCID.js_cid
	}
	else if (isMultiformatsCID(cid))
	{
		return EnumTypeofCID.multiformats_cid
	}
}

export function assertJsCID<T extends JsCID = JsCID>(cid: any): asserts cid is T
{
	if (!isJsCID(cid))
	{
		throw new TypeError(`CID is not '${EnumTypeofCID.js_cid}'`)
	}
}

export function assertMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: any): asserts cid is T
{
	if (!isMultiformatsCID(cid))
	{
		throw new TypeError(`CID is not '${EnumTypeofCID.multiformats_cid}'`)
	}
}

export default typeofCID
