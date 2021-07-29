export * from './lib/js-cids';
export * from './lib/js-multiformats';
export * from './lib/util';
export * from './lib/types';
export declare const enum EnumTypeofCID {
    /**
     * for typo
     * @deprecated
     */
    js_cid = "@ipld/js-cid/CID",
    js_cids = "@ipld/js-cid/CID",
    multiformats_cid = "@ipld/js-multiformats/CID"
}
export declare function typeofCID(cid: any, throwError?: boolean): EnumTypeofCID;
export declare function typeofRawCID(cid: any, throwError?: boolean): EnumTypeofCID;
export default typeofCID;
