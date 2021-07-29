import { CID as MultiformatsCID } from 'multiformats';
import { EnumTypeofCID } from '../index';
import { isJsCID } from './js-cids';
import { _isCIDLike, _isArrayLike } from './util';
import err_code from 'err-code';

/**
 * @deprecated this is not exists
 * @see https://github.com/multiformats/js-multiformats/pull/109
 */
export const SymbolMultiformatsCID = Symbol.for(EnumTypeofCID.multiformats_cid);

export interface IRawMultiformatsCID extends Pick<MultiformatsCID, 'version' | 'code' | 'multihash' | 'bytes'>
{

}

export function isRawMultiformatsCIDLike<T extends IRawMultiformatsCID>(cid: T | unknown): cid is T
{
	return _isCIDLike(cid) && typeof cid.code === 'number' && _isArrayLike(cid.bytes) && !_isArrayLike(cid.multihash)
}

export function isMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: unknown): cid is T
{
	return !isJsCID(cid) && isRawMultiformatsCIDLike<MultiformatsCID>(cid) && typeof cid.toV1 === 'function' && (cid as any)?.asCID === cid
}

export function assertMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: any): asserts cid is T
{
	if (!isMultiformatsCID(cid))
	{
		throw err_code(new TypeError(`CID is not '${EnumTypeofCID.multiformats_cid}'`), {
			input: cid,
		})
	}
}

export function toRawMultiformatsCID(cid: IRawMultiformatsCID): IRawMultiformatsCID
{
	const { version, code, multihash, bytes } = cid

	const value: IRawMultiformatsCID = {
		version,
		code,
		multihash,
		bytes,
	}

	return value
}

export type IRawMultiformatsCIDFake<T extends IRawMultiformatsCID = IRawMultiformatsCID> = T
	& {
	asCID?: IRawMultiformatsCIDFake<T>;
}

export function toRawMultiformatsCIDFake(cid: IRawMultiformatsCID): IRawMultiformatsCIDFake
{
	const value: IRawMultiformatsCIDFake = toRawMultiformatsCID(cid)

	value.asCID = value;

	return value
}
