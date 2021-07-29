import { ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import typeofCID, { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';
import JsCID from 'cids';
import { bases as basesMap } from 'multiformats/basics';
import { BaseCodec, Codec } from 'multiformats/types/bases/base';
import { CID as MultiformatsCID } from 'multiformats'

export type IBaseNameOrBaseCodec = Parameters<ICIDObject["toString"]>[0];

export type IBaseName = Extract<IBaseNameOrBaseCodec, string>;
export type IBaseCodec = Exclude<IBaseNameOrBaseCodec, string | undefined>;

export function cidToString(cid: ICIDObject, base?: IBaseNameOrBaseCodec)
{
	const type = typeofCID(cid);

	if (typeof base === 'undefined' || base === null)
	{
		return cid.toString()
	}
	else if (typeof base === 'string')
	{
		if (type === EnumTypeofCID.js_cids)
		{
			return (cid as JsCID).toString(base)
		}

		base = basesMap[base]
	}
	else if (type === EnumTypeofCID.js_cids)
	{
		return (cid as JsCID).toString((base as Codec<IBaseName, string>).name)
	}

	return (cid as MultiformatsCID).toString(base as IBaseCodec)
}

/**
 * default ipfs cid hash
 */
export function cidToQmHash(cid: ICIDObject)
{
	return cidToString(cid.toV0(), 'base58btc')
}

/**
 * use for subdomain
 */
export function cidToBase32(cid: ICIDObject)
{
	return cidToString(cid.toV1(), 'base32')
}

export default cidToString
