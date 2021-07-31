"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultToPathWithNs = exports.resultToPath = void 0;
const asserts_1 = require("./asserts");
function resultToPath(result) {
    var _a;
    (0, asserts_1.assertToParsePathResult)(result);
    return `/${result.ns}/${result.hash}${(_a = result.path) !== null && _a !== void 0 ? _a : ''}`;
}
exports.resultToPath = resultToPath;
function resultToPathWithNs(result) {
    var _a;
    (0, asserts_1.assertToParsePathResult)(result);
    return `${result.hash}${(_a = result.path) !== null && _a !== void 0 ? _a : ''}`;
}
exports.resultToPathWithNs = resultToPathWithNs;
//# sourceMappingURL=formatter.js.map