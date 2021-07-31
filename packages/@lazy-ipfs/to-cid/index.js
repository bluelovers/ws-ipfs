"use strict";
/**
 * Created by user on 2020/5/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.strToCidToStr = exports.toCID = exports.toRawCID = exports.isRawCIDLike = exports.assertRawCIDLike = exports.isCID = exports.classCID = exports.SymbolCID = void 0;
const tslib_1 = require("tslib");
const cids_1 = (0, tslib_1.__importDefault)(require("cids"));
const multiformats_1 = require("multiformats");
const js_cids_1 = require("@lazy-ipfs/detect-cid-lib/lib/js-cids");
const index_1 = (0, tslib_1.__importStar)(require("@lazy-ipfs/detect-cid-lib/index"));
const err_code_1 = (0, tslib_1.__importDefault)(require("err-code"));
const multiformats_2 = (0, tslib_1.__importDefault)(require("./lib/multiformats"));
const js_cids_2 = require("./lib/js-cids");
const index_2 = require("@lazy-ipfs/cid-to-string/index");
(0, tslib_1.__exportStar)(require("@lazy-ipfs/detect-cid-lib/lib/types"), exports);
var js_cids_3 = require("@lazy-ipfs/detect-cid-lib/lib/js-cids");
Object.defineProperty(exports, "SymbolCID", { enumerable: true, get: function () { return js_cids_3.SymbolJsCID; } });
function classCID(libCID) {
    libCID !== null && libCID !== void 0 ? libCID : (libCID = multiformats_1.CID);
    if (libCID === cids_1.default || libCID === "@ipld/js-cid/CID" /* js_cids */) {
        return js_cids_2.toJsCID;
    }
    return multiformats_2.default;
}
exports.classCID = classCID;
function isCID(cid, libCID) {
    const type = (0, index_1.default)(cid);
    // @ts-ignore
    if (libCID === multiformats_1.CID || libCID === "@ipld/js-multiformats/CID" /* js_multiformats */) {
        return type === "@ipld/js-multiformats/CID" /* multiformats_cid */;
    }
    // @ts-ignore
    else if (libCID === cids_1.default || libCID === "@ipld/js-cid/CID" /* js_cids */) {
        return type === "@ipld/js-cid/CID" /* js_cids */;
    }
    return (type === null || type === void 0 ? void 0 : type.length) > 0;
}
exports.isCID = isCID;
function assertRawCIDLike(cid) {
    if (!isRawCIDLike(cid)) {
        throw (0, err_code_1.default)(new TypeError(`Invalid type for CID like`), {
            input: cid,
        });
    }
}
exports.assertRawCIDLike = assertRawCIDLike;
function isRawCIDLike(cid) {
    return (0, index_1.isRawMultiformatsCIDLike)(cid) || (0, js_cids_1.isRawJsCIDLike)(cid);
}
exports.isRawCIDLike = isRawCIDLike;
function toRawCID(cid) {
    assertRawCIDLike(cid);
    if ((0, index_1.isRawMultiformatsCIDLike)(cid)) {
        return (0, index_1.toRawMultiformatsCID)(cid);
    }
    return (0, js_cids_1.toRawJsCID)(cid);
}
exports.toRawCID = toRawCID;
function toCID(cid, libCID) {
    return classCID(libCID)(cid, libCID);
}
exports.toCID = toCID;
function strToCidToStr(str, base) {
    return (0, index_2.cidToString)(toCID(str), base);
}
exports.strToCidToStr = strToCidToStr;
exports.default = toCID;
//# sourceMappingURL=index.js.map