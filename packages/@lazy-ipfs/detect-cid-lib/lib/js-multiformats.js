"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRawMultiformatsCIDFake = exports.toRawMultiformatsCID = exports.assertMultiformatsCID = exports.isMultiformatsCID = exports.isRawMultiformatsCIDLike = exports.SymbolMultiformatsCID = void 0;
const tslib_1 = require("tslib");
const js_cids_1 = require("./js-cids");
const util_1 = require("./util");
const err_code_1 = tslib_1.__importDefault(require("err-code"));
/**
 * @deprecated this is not exists
 * @see https://github.com/multiformats/js-multiformats/pull/109
 */
exports.SymbolMultiformatsCID = Symbol.for("@ipld/js-multiformats/CID" /* EnumTypeofCID.multiformats_cid */);
function isRawMultiformatsCIDLike(cid) {
    return (0, util_1._isCIDLike)(cid) && typeof cid.code === 'number' && (0, util_1._isArrayLike)(cid.bytes) && !(0, util_1._isArrayLike)(cid.multihash);
}
exports.isRawMultiformatsCIDLike = isRawMultiformatsCIDLike;
function isMultiformatsCID(cid) {
    return !(0, js_cids_1.isJsCID)(cid) && isRawMultiformatsCIDLike(cid) && typeof cid.toV1 === 'function' && (cid === null || cid === void 0 ? void 0 : cid.asCID) === cid;
}
exports.isMultiformatsCID = isMultiformatsCID;
function assertMultiformatsCID(cid) {
    if (!isMultiformatsCID(cid)) {
        throw (0, err_code_1.default)(new TypeError(`CID is not '${"@ipld/js-multiformats/CID" /* EnumTypeofCID.multiformats_cid */}'`), {
            input: cid,
        });
    }
}
exports.assertMultiformatsCID = assertMultiformatsCID;
function toRawMultiformatsCID(cid) {
    const { version, code, multihash, bytes } = cid;
    const value = {
        version,
        code,
        multihash,
        bytes,
    };
    return value;
}
exports.toRawMultiformatsCID = toRawMultiformatsCID;
function toRawMultiformatsCIDFake(cid) {
    const value = toRawMultiformatsCID(cid);
    value.asCID = value;
    return value;
}
exports.toRawMultiformatsCIDFake = toRawMultiformatsCIDFake;
//# sourceMappingURL=js-multiformats.js.map