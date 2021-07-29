"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertJsCID = exports.isJsCID = exports.isRawJsCIDLike = exports.SymbolJsCID = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../index");
const util_1 = require("./util");
const err_code_1 = (0, tslib_1.__importDefault)(require("err-code"));
exports.SymbolJsCID = Symbol.for("@ipld/js-cid/CID" /* js_cids */);
function isRawJsCIDLike(cid) {
    return (0, index_1._isCIDLike)(cid) && typeof cid.codec === 'string' && (0, util_1._isArrayLike)(cid.multihash);
}
exports.isRawJsCIDLike = isRawJsCIDLike;
function isJsCID(cid) {
    return ((cid === null || cid === void 0 ? void 0 : cid[exports.SymbolJsCID]) === true) && isRawJsCIDLike(cid) && typeof cid.toV1 === 'function';
}
exports.isJsCID = isJsCID;
function assertJsCID(cid) {
    if (!isJsCID(cid)) {
        throw (0, err_code_1.default)(new TypeError(`CID is not '${"@ipld/js-cid/CID" /* js_cids */}'`), {
            input: cid,
        });
    }
}
exports.assertJsCID = assertJsCID;
//# sourceMappingURL=js-cids.js.map