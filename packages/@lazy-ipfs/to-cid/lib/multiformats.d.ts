import { CID as MultiformatsCID } from 'multiformats';
import { ICIDValueInput } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';
export declare function toMultiformatsCID<T extends ICIDValueInput, C extends MultiformatsCID = MultiformatsCID>(cidInput: T, libCID?: Pick<typeof MultiformatsCID, 'parse' | 'decode' | 'asCID'> | EnumTypeofCID): C;
export default toMultiformatsCID;
