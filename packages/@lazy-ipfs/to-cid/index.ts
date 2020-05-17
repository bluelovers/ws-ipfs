/**
 * Created by user on 2020/5/17.
 */

import CID from 'cids';

const symbolName = '@ipld/js-cid/CID';
export const SymbolCID = Symbol.for(symbolName);

export type IRawCIDVersion = 0 | 1;

export interface IRawCID
{
	version: IRawCIDVersion;
	codec: string;
	multihash: Buffer;
	multibaseName: string;
}

export type IStaticCID<C extends CID = CID> = {
	new(
		version: 0 | 1,
		codec: string,
		multhash: Buffer,
		multibaseName?: string,
	): C;
	new(cid: C): C;
	new(str: string): C;
	new(buf: Buffer): C;
};

export function getSymbolCID()
{
	const symbolName = '@ipld/js-cid/CID';
	return Symbol.for(symbolName)
}

export function classCID<C extends CID = CID>(libCID?: (new (...argv) => C)): IStaticCID<C> & {
	isCID(cid: any): boolean,
}
{
	// @ts-ignore
	return (libCID ?? CID)
}

export function hasCIDSymbol<C extends CID = CID>(cid: C): cid is C & {
	[SymbolCID]: true,
}
{
	return cid?.[SymbolCID] === true
}

export function isCID<C extends CID = CID>(cid: any, libCID?: (new (...argv) => C)): cid is C
{
	return classCID(libCID).isCID(cid);
}

export function assertRawCIDLike(cid: any): asserts cid is IRawCID
{
	if (!isRawCIDLike(cid))
	{
		throw new TypeError(`cid not a valid CID like data`)
	}
}

export function isRawCIDLike(cid: any): cid is IRawCID
{
	return (!isUndefined(cid?.version) && cid?.codec?.length && cid?.multihash?.length && cid?.multibaseName?.length)
}

export function toRawCID<C extends CID = CID>(cid: CID | IRawCID): IRawCID
{
	assertRawCIDLike(cid);

	const {
		version,
		codec,
		multihash,
		multibaseName,
	} = cid;

	return {
		version,
		codec,
		multihash,
		multibaseName,
	}
}

export function toCID<C extends CID = CID>(cid: any, libCID?: IStaticCID<C>): C
{
	libCID = classCID(libCID);

	if (isRawCIDLike(cid))
	{
		const {
			version,
			codec,
			multihash,
			multibaseName,
		} = cid;

		return new libCID(version, codec, multihash, multibaseName)
	}

	return new libCID(cid);
}

export default toCID;

function isUndefined<T>(target: T)
{
	return target === null || target === void 0
}
