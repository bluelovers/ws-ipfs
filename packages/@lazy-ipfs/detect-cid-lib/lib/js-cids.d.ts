import JsCID from 'cids';
import { ITSPickExtra, ITSRequireAtLeastOne } from 'ts-type';
export declare const SymbolJsCID: unique symbol;
export type IRawJsCID = ITSRequireAtLeastOne<ITSPickExtra<JsCID, 'version' | 'multihash' | 'codec' | 'code', 'multibaseName'>, 'codec' | 'code'>;
export declare function isRawJsCIDLike<T extends IRawJsCID = IRawJsCID>(cid: T | unknown): cid is T;
export declare function isJsCID<T extends JsCID = JsCID>(cid: unknown): cid is T;
export declare function assertJsCID<T extends JsCID = JsCID>(cid: any): asserts cid is T;
export declare function toRawJsCID(cid: IRawJsCID): IRawJsCID;
export type IRawJsCIDFake<T extends IRawJsCID = IRawJsCID> = T & {
    [SymbolJsCID]?: true;
};
export declare function toRawJsCIDFake(cid: IRawJsCID): IRawJsCIDFake;
