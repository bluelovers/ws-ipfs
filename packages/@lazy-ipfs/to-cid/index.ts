/**
 * Created by user on 2020/5/17.
 */

import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
import { IRawJsCID, isRawJsCIDLike, toRawJsCID } from '@lazy-ipfs/detect-cid-lib/lib/js-cids';
import { ICIDObject, ICIDObjectInput, ICIDValueInput, IRawCIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import typeofCID, { EnumTypeofCID, isRawMultiformatsCIDLike, toRawMultiformatsCID } from '@lazy-ipfs/detect-cid-lib/index';
import err_code from 'err-code';
import toMultiformatsCID from './lib/multiformats';
import { toJsCID } from './lib/js-cids';
export * from '@lazy-ipfs/detect-cid-lib/lib/types';

export { SymbolJsCID as SymbolCID } from '@lazy-ipfs/detect-cid-lib/lib/js-cids';

export type IStaticCID<C extends ICIDObject = ICIDObject> = new(...argv: any[]) => C;

export function classCID<C extends ICIDObject = MultiformatsCID>(libCID?: IStaticCID<C> | typeof MultiformatsCID | typeof JsCID): <T extends ICIDValueInput>(cidInput: T, libCID?: IStaticCID<C>) => C
{
	libCID ??= MultiformatsCID;

	if (libCID === JsCID)
	{
		return toJsCID as any
	}

	return toMultiformatsCID as any
}

export function isCID<C extends ICIDObject = ICIDObject>(cid: unknown, libCID?: IStaticCID<C>): cid is C
{
	const type = typeofCID(cid);

	// @ts-ignore
	if (libCID === MultiformatsCID)
	{
		return type === EnumTypeofCID.multiformats_cid
	}
	// @ts-ignore
	else if (libCID === JsCID)
	{
		return type === EnumTypeofCID.js_cids
	}

	return type?.length > 0
}

export function assertRawCIDLike<C extends IRawCIDObject = IRawCIDObject>(cid: unknown): asserts cid is C
{
	if (!isRawCIDLike(cid))
	{
		throw err_code(new TypeError(`Invalid type for CID like`), {
			input: cid,
		})
	}
}

export function isRawCIDLike<T extends IRawCIDObject = IRawCIDObject>(cid: any): cid is T
{
	return isRawMultiformatsCIDLike(cid) || isRawJsCIDLike(cid)
}

export function toRawCID<C extends ICIDObjectInput = ICIDObjectInput>(cid: C)
{
	assertRawCIDLike(cid);

	if (isRawMultiformatsCIDLike(cid))
	{
		return toRawMultiformatsCID(cid)
	}

	return toRawJsCID(cid)
}

export function toCID<C extends ICIDObject = ICIDObject>(cid: any, libCID?: IStaticCID<C>): C
{
	return classCID(libCID)(cid, libCID)
}

export default toCID;
