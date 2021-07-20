"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.addAllPromise = exports.addAll = void 0;
const tslib_1 = require("tslib");
const it_last_1 = (0, tslib_1.__importDefault)(require("it-last"));
const it_all_1 = (0, tslib_1.__importDefault)(require("it-all"));
function addAll(ipfs, ...argv) {
    var _a;
    return ((_a = ipfs.addAll) !== null && _a !== void 0 ? _a : (ipfs.add))(...argv);
}
exports.addAll = addAll;
function addAllPromise(ipfs, ...argv) {
    return (0, it_all_1.default)(addAll(ipfs, ...argv));
}
exports.addAllPromise = addAllPromise;
function add(ipfs, ...argv) {
    return (0, it_last_1.default)(addAll(ipfs, ...argv));
}
exports.add = add;
exports.default = addAll;
//# sourceMappingURL=index.js.map