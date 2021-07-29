import JsCID from 'cids';
import { ITSPickExtra } from 'ts-type';
export declare const SymbolJsCID: unique symbol;
export interface IRawJsCID extends ITSPickExtra<JsCID, 'version' | 'codec' | 'multihash', 'multibaseName'> {
}
export declare function isRawJsCIDLike<T extends IRawJsCID = IRawJsCID>(cid: T | unknown): cid is T;
export declare function isJsCID<T extends JsCID = JsCID>(cid: unknown): cid is T;
export declare function assertJsCID<T extends JsCID = JsCID>(cid: any): asserts cid is T;
