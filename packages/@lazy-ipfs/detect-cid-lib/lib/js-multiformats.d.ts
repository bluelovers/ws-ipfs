import { CID as MultiformatsCID } from 'multiformats';
/**
 * @deprecated this is not exists
 * @see https://github.com/multiformats/js-multiformats/pull/109
 */
export declare const SymbolMultiformatsCID: unique symbol;
export interface IRawMultiformatsCID extends Pick<MultiformatsCID, 'version' | 'code' | 'multihash' | 'bytes'> {
}
export declare function isRawMultiformatsCIDLike<T extends IRawMultiformatsCID>(cid: T | unknown): cid is T;
export declare function isMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: unknown): cid is T;
export declare function assertMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: any): asserts cid is T;
