import JsCID from 'cids';
import { ICIDValueInput } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { IStaticCID } from '../index';
export declare function toJsCID<T extends ICIDValueInput, C extends JsCID = JsCID>(cidInput: T, libCID?: IStaticCID<C>): C;
