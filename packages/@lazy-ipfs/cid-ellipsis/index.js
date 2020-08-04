"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cidEllipsis = exports.cidStartAndEnd = void 0;
function cidStartAndEnd(value, sep = '…') {
    const chars = value.split('');
    if (chars.length <= 9)
        throw new TypeError(`cid.length < 9`);
    const start = chars.slice(0, 4).join('');
    const end = chars.slice(chars.length - 4).join('');
    return {
        value,
        start,
        end,
        sep,
    };
}
exports.cidStartAndEnd = cidStartAndEnd;
function cidEllipsis(value, sep) {
    let result = cidStartAndEnd(value === null || value === void 0 ? void 0 : value.toString(), sep);
    return `${result.start}${result.sep}${result.end}`;
}
exports.cidEllipsis = cidEllipsis;
exports.default = cidEllipsis;
//# sourceMappingURL=index.js.map