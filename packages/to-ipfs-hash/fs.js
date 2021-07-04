"use strict";
/**
 * Created by user on 2020/2/21.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFile = void 0;
const fs_extra_1 = require("fs-extra");
const index_1 = __importDefault(require("./index"));
function fromFile(file, options) {
    return (0, fs_extra_1.readFile)(file).then(buf => (0, index_1.default)(buf, options));
}
exports.fromFile = fromFile;
exports.default = fromFile;
//# sourceMappingURL=fs.js.map