import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
export declare const enum EnumTypeofCID {
    js_cid = "@ipld/js-cid/CID",
    multiformats_cid = "@ipld/js-multiformats/CID"
}
export declare const SymbolJsCID: unique symbol;
/**
 * @deprecated this is not exists
 * @see https://github.com/multiformats/js-multiformats/pull/109
 */
export declare const SymbolMultiformatsCID: unique symbol;
export declare function _isArrayLike<T extends Pick<any[], number | 'length'>>(input: any): input is T;
export declare function _isCIDLike(cid: JsCID | MultiformatsCID): boolean;
export declare type ICID = JsCID | MultiformatsCID;
export declare function isJsCID<T extends JsCID = JsCID>(cid: any): cid is T;
export declare function isMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: any): cid is T;
export declare function typeofCID(cid: any): EnumTypeofCID;
export declare function assertJsCID<T extends JsCID = JsCID>(cid: any): asserts cid is T;
export declare function assertMultiformatsCID<T extends MultiformatsCID = MultiformatsCID>(cid: any): asserts cid is T;
export default typeofCID;
