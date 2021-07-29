import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
import { IRawJsCID } from './js-cids';
import { IRawMultiformatsCID } from './js-multiformats';

export type ICIDObject = JsCID | MultiformatsCID;
export type ICIDRawObject = IRawJsCID | IRawMultiformatsCID;

export type IRawCIDVersion = ICIDObject["version"];
export type ICIDValue = ICIDObject | string;
export type ICIDValueOrRaw = ICIDValue | ICIDRawObject;

export type I_CIDLike = Pick<ICIDObject, 'version' | 'multihash'>
