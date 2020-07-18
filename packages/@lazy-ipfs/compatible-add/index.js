"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAll = void 0;
function addAll(ipfs, ...argv) {
    var _a;
    return ((_a = ipfs.addAll) !== null && _a !== void 0 ? _a : ipfs.add)(...argv);
}
exports.addAll = addAll;
exports.default = addAll;
//# sourceMappingURL=index.js.map