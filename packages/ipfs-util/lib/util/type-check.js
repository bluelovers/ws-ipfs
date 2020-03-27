"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileObject = exports.isBloby = exports.isBytes = void 0;
function isBytes(obj) {
    return Buffer.isBuffer(obj) || ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer;
}
exports.isBytes = isBytes;
function isBloby(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}
exports.isBloby = isBloby;
/**
 * An object with a path or content property
 */
function isFileObject(obj) {
    return typeof obj === 'object' && (obj.path || obj.content);
}
exports.isFileObject = isFileObject;
//# sourceMappingURL=type-check.js.map