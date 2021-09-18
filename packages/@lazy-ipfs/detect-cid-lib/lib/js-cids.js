"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRawJsCIDFake = exports.toRawJsCID = exports.assertJsCID = exports.isJsCID = exports.isRawJsCIDLike = exports.SymbolJsCID = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./util");
const err_code_1 = (0, tslib_1.__importDefault)(require("err-code"));
const multicodec_1 = require("multicodec");
exports.SymbolJsCID = Symbol.for("@ipld/js-cid/CID" /* js_cids */);
function isRawJsCIDLike(cid) {
    return (0, util_1._isCIDLike)(cid) && (typeof cid.codec === 'string' || typeof cid.code === 'number') && (0, util_1._isArrayLike)(cid.multihash);
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
function toRawJsCID(cid) {
    let { version, codec, code, multihash } = cid;
    // @ts-ignore
    code !== null && code !== void 0 ? code : (code = (0, multicodec_1.getCodeFromName)(codec));
    // @ts-ignore
    codec !== null && codec !== void 0 ? codec : (codec = (0, multicodec_1.getNameFromCode)(code));
    return {
        version,
        codec,
        code,
        multihash,
    };
}
exports.toRawJsCID = toRawJsCID;
function toRawJsCIDFake(cid) {
    const value = toRawJsCID(cid);
    value[exports.SymbolJsCID] = true;
    return value;
}
exports.toRawJsCIDFake = toRawJsCIDFake;
//# sourceMappingURL=js-cids.js.map