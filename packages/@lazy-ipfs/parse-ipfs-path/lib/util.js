"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isParsePathResultLoose = exports._parsedPathIsPath = exports._parsedPathIsCid = exports._isDefined = exports._invalidPath = exports._isEmptyPath = exports._isStringObject = void 0;
function _isStringObject(input) {
    return (input instanceof String || Object.prototype.toString.call(input) === '[object String]');
}
exports._isStringObject = _isStringObject;
function _isEmptyPath(path) {
    return (!(path === null || path === void 0 ? void 0 : path.length) || path === '/' || path === '');
}
exports._isEmptyPath = _isEmptyPath;
function _invalidPath(path) {
    return ((path === null || path === void 0 ? void 0 : path.length) && path[0] !== '/' || typeof path !== 'string' && _isDefined(path));
}
exports._invalidPath = _invalidPath;
function _isDefined(path) {
    return typeof path !== 'undefined' && path !== null;
}
exports._isDefined = _isDefined;
function _parsedPathIsCid(input) {
    return isParsePathResultLoose(input) && _isEmptyPath(input.path);
}
exports._parsedPathIsCid = _parsedPathIsCid;
function _parsedPathIsPath(input) {
    return isParsePathResultLoose(input) && !_isEmptyPath(input.path);
}
exports._parsedPathIsPath = _parsedPathIsPath;
function isParsePathResultLoose(result) {
    // @ts-ignore
    return Boolean(result.ns && result.hash);
}
exports.isParsePathResultLoose = isParsePathResultLoose;
//# sourceMappingURL=util.js.map