import { ICIDValueInput, IStaticCID } from '@lazy-ipfs/to-cid';
import { CID as MultiformatsCID } from 'multiformats';
import { ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare function isSameCID<C extends ICIDObject = MultiformatsCID>(a: ICIDValueInput, b: ICIDValueInput, libCID?: IStaticCID<C>): C;
export default isSameCID;
