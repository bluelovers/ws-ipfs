import JsCID from 'cids';
import { IStaticCID, IToCIDInputValue } from '../index';
export declare function toJsCID<T extends IToCIDInputValue, C extends JsCID = JsCID>(cidInput: T, libCID?: IStaticCID<C>): C;
