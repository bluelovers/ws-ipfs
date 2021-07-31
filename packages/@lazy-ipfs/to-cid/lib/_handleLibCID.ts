import { EnumTypeofCID, ICIDObject } from '@lazy-ipfs/detect-cid-lib';
import { IStaticCID } from '../index';
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';

export type ILibCID<C extends ICIDObject = ICIDObject> =
	IStaticCID<C>
	| typeof JsCID
	| Pick<typeof MultiformatsCID, 'parse' | 'decode' | 'asCID'>
	| IStaticCID<JsCID>;

export function _handleLibCID<C extends ILibCID>(libCID: C | EnumTypeofCID, defaultLibCID?: ILibCID): C
{
	if (libCID === EnumTypeofCID.js_cids)
	{
		return JsCID as any
	}
	else if (libCID === EnumTypeofCID.js_multiformats)
	{
		return MultiformatsCID as any
	}

	return libCID ?? defaultLibCID as any;
}
