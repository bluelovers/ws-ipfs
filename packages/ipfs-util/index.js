"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBufferMaybe = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./api"), exports);
function isBufferMaybe(buf) {
    return (buf === null || buf === void 0 ? void 0 : buf.length) && typeof (buf === null || buf === void 0 ? void 0 : buf[0]) === 'number';
}
exports.isBufferMaybe = isBufferMaybe;
//# sourceMappingURL=index.js.map