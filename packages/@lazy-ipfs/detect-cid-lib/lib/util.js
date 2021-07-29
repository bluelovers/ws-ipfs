"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isCIDLike = exports._isArrayLike = void 0;
function _isArrayLike(input) {
    const type = typeof input;
    return Array.isArray(input) || type !== 'function' && type !== 'string' && typeof (input === null || input === void 0 ? void 0 : input.length) === 'number' && typeof input.forEach === 'function' && typeof input.slice === 'function';
}
exports._isArrayLike = _isArrayLike;
function _isCIDLike(cid) {
    return typeof (cid === null || cid === void 0 ? void 0 : cid.version) === 'number' && typeof cid.multihash !== 'undefined';
}
exports._isCIDLike = _isCIDLike;
//# sourceMappingURL=util.js.map