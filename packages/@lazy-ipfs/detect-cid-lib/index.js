"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertMultiformatsCID = exports.assertJsCID = exports.typeofCID = exports.isMultiformatsCID = exports.isJsCID = exports._isCIDLike = exports._isArrayLike = exports.SymbolMultiformatsCID = exports.SymbolJsCID = exports.EnumTypeofCID = void 0;
var EnumTypeofCID;
(function (EnumTypeofCID) {
    EnumTypeofCID["js_cid"] = "@ipld/js-cid/CID";
    EnumTypeofCID["multiformats_cid"] = "@ipld/js-multiformats/CID";
})(EnumTypeofCID = exports.EnumTypeofCID || (exports.EnumTypeofCID = {}));
exports.SymbolJsCID = Symbol.for("@ipld/js-cid/CID" /* js_cid */);
/**
 * @deprecated this is not exists
 * @see https://github.com/multiformats/js-multiformats/pull/109
 */
exports.SymbolMultiformatsCID = Symbol.for("@ipld/js-multiformats/CID" /* multiformats_cid */);
function _isArrayLike(input) {
    const type = typeof input;
    return Array.isArray(input) || type !== 'function' && type !== 'string' && typeof (input === null || input === void 0 ? void 0 : input.length) === 'number' && typeof input.forEach === 'function' && typeof input.slice === 'function';
}
exports._isArrayLike = _isArrayLike;
function _isCIDLike(cid) {
    return typeof (cid === null || cid === void 0 ? void 0 : cid.version) === 'number' && typeof cid.multihash !== 'undefined';
}
exports._isCIDLike = _isCIDLike;
function isJsCID(cid) {
    return (cid[exports.SymbolJsCID] === true) && _isArrayLike(cid.multihash);
}
exports.isJsCID = isJsCID;
function isMultiformatsCID(cid) {
    return !isJsCID(cid) && _isArrayLike(cid.bytes) && !_isArrayLike(cid.multihash);
}
exports.isMultiformatsCID = isMultiformatsCID;
function typeofCID(cid) {
    if (isJsCID(cid)) {
        return "@ipld/js-cid/CID" /* js_cid */;
    }
    else if (isMultiformatsCID(cid)) {
        return "@ipld/js-multiformats/CID" /* multiformats_cid */;
    }
}
exports.typeofCID = typeofCID;
function assertJsCID(cid) {
    if (!isJsCID(cid)) {
        throw new TypeError(`CID is not '${"@ipld/js-cid/CID" /* js_cid */}'`);
    }
}
exports.assertJsCID = assertJsCID;
function assertMultiformatsCID(cid) {
    if (!isMultiformatsCID(cid)) {
        throw new TypeError(`CID is not '${"@ipld/js-multiformats/CID" /* multiformats_cid */}'`);
    }
}
exports.assertMultiformatsCID = assertMultiformatsCID;
exports.default = typeofCID;
//# sourceMappingURL=index.js.map