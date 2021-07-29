/**
 * Created by user on 2020/5/17.
 */
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
import { ICIDObject, ICIDObjectInput, ICIDValueInput, IRawCIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { IBaseNameOrBaseCodec } from '@lazy-ipfs/cid-to-string/index';
export * from '@lazy-ipfs/detect-cid-lib/lib/types';
export { SymbolJsCID as SymbolCID } from '@lazy-ipfs/detect-cid-lib/lib/js-cids';
export declare type IStaticCID<C extends ICIDObject = ICIDObject> = new (...argv: any[]) => C;
export declare function classCID<C extends ICIDObject = MultiformatsCID>(libCID?: IStaticCID<C> | typeof MultiformatsCID | typeof JsCID): <T extends ICIDValueInput>(cidInput: T, libCID?: IStaticCID<C>) => C;
export declare function isCID<C extends ICIDObject = ICIDObject>(cid: unknown, libCID?: IStaticCID<C>): cid is C;
export declare function assertRawCIDLike<C extends IRawCIDObject = IRawCIDObject>(cid: unknown): asserts cid is C;
export declare function isRawCIDLike<T extends IRawCIDObject = IRawCIDObject>(cid: any): cid is T;
export declare function toRawCID<C extends ICIDObjectInput = ICIDObjectInput>(cid: C): import("@lazy-ipfs/detect-cid-lib/index").IRawJsCID | import("@lazy-ipfs/detect-cid-lib/index").IRawMultiformatsCID;
export declare function toCID<C extends ICIDObject = ICIDObject>(cid: any, libCID?: IStaticCID<C>): C;
export declare function strToCidToStr(str: string, base?: IBaseNameOrBaseCodec): string;
export default toCID;
