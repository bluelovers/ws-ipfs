/**
 * Created by user on 2020/5/17.
 */
/// <reference types="node" />
import CID from 'cids';
export declare const SymbolCID: unique symbol;
export declare type IRawCIDVersion = 0 | 1;
export interface IRawCID {
    version: IRawCIDVersion;
    codec: string;
    multihash: Buffer;
    multibaseName?: string;
}
export declare type ICIDObject = CID;
export declare type ICIDValue = ICIDObject | string;
export declare type ICIDValueInput = ICIDValue | IRawCID | Buffer;
export declare type IStaticCID<C extends CID = CID> = {
    new (version: 0 | 1, codec: string, multhash: Buffer, multibaseName?: string): C;
    new (cid: C): C;
    new (str: string): C;
    new (buf: Buffer): C;
};
export declare function getSymbolCID(): symbol;
export declare function classCID<C extends CID = CID>(libCID?: (new (...argv: any[]) => C)): IStaticCID<C> & {
    isCID(cid: any): boolean;
};
export declare function hasCIDSymbol<C extends CID = CID>(cid: C): cid is C & {
    [SymbolCID]: true;
};
export declare function isCID<C extends CID = CID>(cid: any, libCID?: (new (...argv: any[]) => C)): cid is C;
export declare function assertRawCIDLike(cid: any): asserts cid is IRawCID;
export declare function isRawCIDLike(cid: any): cid is IRawCID;
export declare function toRawCID<C extends CID = CID>(cid: CID | IRawCID): IRawCID;
export declare function toCID<C extends CID = CID>(cid: any, libCID?: IStaticCID<C>): C;
export default toCID;
