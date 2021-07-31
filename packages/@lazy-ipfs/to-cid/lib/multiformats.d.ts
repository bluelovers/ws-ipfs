import { CID as MultiformatsCID } from 'multiformats';
import { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';
import { IToCIDInputValue } from '../index';
export declare function toMultiformatsCID<T extends IToCIDInputValue, C extends MultiformatsCID = MultiformatsCID>(cidInput: T, libCID?: Pick<typeof MultiformatsCID, 'parse' | 'decode' | 'asCID'> | EnumTypeofCID): C;
export default toMultiformatsCID;
