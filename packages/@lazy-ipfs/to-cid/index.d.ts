/**
 * Created by user on 2020/5/17.
 */
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
import { ICIDObject, ICIDObjectInput, ICIDValueInput, IRawCIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';
import { IBaseNameOrBaseCodec } from '@lazy-ipfs/cid-to-string';
import { IParsePathResult } from '@lazy-ipfs/parse-ipfs-path/lib/types';
export * from '@lazy-ipfs/detect-cid-lib/lib/types';
export { SymbolJsCID as SymbolCID } from '@lazy-ipfs/detect-cid-lib/lib/js-cids';
export type IStaticCID<C extends ICIDObject = ICIDObject> = new (...argv: any[]) => C;
export type IToCIDInputValue = ICIDValueInput | IParsePathResult;
export declare function classCID<C extends ICIDObject = MultiformatsCID>(libCID?: IStaticCID<C> | typeof MultiformatsCID | typeof JsCID | EnumTypeofCID): <T extends IToCIDInputValue>(cidInput: T, libCID?: IStaticCID<C> | EnumTypeofCID) => C;
export declare function isCID<C extends ICIDObject = ICIDObject>(cid: unknown, libCID?: IStaticCID<C> | EnumTypeofCID): cid is C;
export declare function assertRawCIDLike<C extends IRawCIDObject = IRawCIDObject>(cid: unknown): asserts cid is C;
export declare function isRawCIDLike<T extends IRawCIDObject = IRawCIDObject>(cid: any): cid is T;
export declare function toRawCID<R extends IRawCIDObject = IRawCIDObject>(cid: ICIDObjectInput): R;
export declare function toCID<C extends ICIDObject = MultiformatsCID>(cid: IToCIDInputValue, libCID?: IStaticCID<C> | EnumTypeofCID): C;
export declare function strToCidToStr(str: string, base?: IBaseNameOrBaseCodec): string;
export default toCID;
