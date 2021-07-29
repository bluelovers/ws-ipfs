import JsCID from 'cids';
import { _isCIDLike, EnumTypeofCID, IRawCIDVersion } from '../index';
import { _isArrayLike } from './util';
import { ITSPickExtra } from 'ts-type';
import err_code from 'err-code';

export const SymbolJsCID = Symbol.for(EnumTypeofCID.js_cids);

export interface IRawJsCID extends ITSPickExtra<JsCID, 'version' | 'codec' | 'multihash', 'multibaseName'>
{

}

export function isRawJsCIDLike<T extends IRawJsCID = IRawJsCID>(cid: T | unknown): cid is T
{
	return _isCIDLike(cid) && typeof cid.codec === 'string' && _isArrayLike(cid.multihash)
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

