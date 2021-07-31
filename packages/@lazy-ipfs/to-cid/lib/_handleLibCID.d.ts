import { EnumTypeofCID, ICIDObject } from '@lazy-ipfs/detect-cid-lib';
import { IStaticCID } from '../index';
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
export declare type ILibCID<C extends ICIDObject = ICIDObject> = IStaticCID<C> | typeof JsCID | Pick<typeof MultiformatsCID, 'parse' | 'decode' | 'asCID'> | IStaticCID<JsCID>;
export declare function _handleLibCID<C extends ILibCID>(libCID: C | EnumTypeofCID, defaultLibCID?: ILibCID): C;
