"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isStringObject = void 0;
function _isStringObject(input) {
    return (input instanceof String || Object.prototype.toString.call(input) === '[object String]');
}
exports._isStringObject = _isStringObject;
//# sourceMappingURL=util.js.map