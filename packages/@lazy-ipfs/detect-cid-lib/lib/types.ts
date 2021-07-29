import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
import { IRawJsCID } from './js-cids';
import { IRawMultiformatsCID } from './js-multiformats';

export type ICIDObject = JsCID | MultiformatsCID;
export type IRawCIDObject = IRawJsCID | IRawMultiformatsCID;

export type ICIDObjectInput = ICIDObject | IRawCIDObject;

export type IRawCIDVersion = ICIDObject["version"];
export type ICIDValue = ICIDObject | string;
export type ICIDValueOrRaw = ICIDValue | IRawCIDObject;
export type ICIDValueInput = ICIDValueOrRaw | Uint8Array;

export type I_CIDLike = Pick<ICIDObject, 'version' | 'multihash'>
