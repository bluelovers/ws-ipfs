"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parse = void 0;
function parse(dataBuffer) {
    return JSON.parse(Buffer.from(dataBuffer).toString());
}
exports.parse = parse;
function stringify(dataValue) {
    return Buffer.from(JSON.stringify(dataValue));
}
exports.stringify = stringify;
exports.default = {
    parse,
    stringify,
};
//# sourceMappingURL=index.js.map