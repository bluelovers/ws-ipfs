import { ICIDValueInput, IStaticCID } from '@lazy-ipfs/to-cid';
import CID from 'cids';
export declare function isSameCID<C extends CID = CID>(a: ICIDValueInput, b: ICIDValueInput, libCID?: IStaticCID<C>): C;
export default isSameCID;
