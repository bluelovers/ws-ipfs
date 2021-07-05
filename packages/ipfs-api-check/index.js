"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAll = void 0;
const tslib_1 = require("tslib");
const _allChecks = (0, tslib_1.__importStar)(require("./lib"));
async function checkAll(ipfs) {
    let keys = Object.keys(_allChecks);
    keys.sort();
    let map = {};
    for (let key of keys) {
        map[key] = await _allChecks[key](ipfs);
    }
    return map;
}
exports.checkAll = checkAll;
exports.default = checkAll;
//# sourceMappingURL=index.js.map