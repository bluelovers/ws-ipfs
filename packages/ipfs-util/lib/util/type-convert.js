"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBuffer = void 0;
const type_check_1 = require("./type-check");
function toBuffer(chunk) {
    return type_check_1.isBytes(chunk) ? chunk : Buffer.from(chunk);
}
exports.toBuffer = toBuffer;
//# sourceMappingURL=type-convert.js.map