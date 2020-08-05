"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.addAll = void 0;
const it_last_1 = __importDefault(require("it-last"));
function addAll(ipfs, ...argv) {
    var _a;
    return ((_a = ipfs.addAll) !== null && _a !== void 0 ? _a : ipfs.add)(...argv);
}
exports.addAll = addAll;
function add(ipfs, ...argv) {
    return it_last_1.default(addAll(ipfs, ...argv));
}
exports.add = add;
exports.default = addAll;
//# sourceMappingURL=index.js.map