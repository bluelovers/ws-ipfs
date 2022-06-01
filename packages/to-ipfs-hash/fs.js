"use strict";
/**
 * Created by user on 2020/2/21.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFile = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = require("fs-extra");
const index_1 = tslib_1.__importDefault(require("./index"));
function fromFile(file, options) {
    return (0, fs_extra_1.readFile)(file).then(buf => (0, index_1.default)(buf, options));
}
exports.fromFile = fromFile;
exports.default = fromFile;
//# sourceMappingURL=fs.js.map