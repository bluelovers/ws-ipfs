"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePath = void 0;
const tslib_1 = require("tslib");
const err_code_1 = (0, tslib_1.__importDefault)(require("err-code"));
const parsePathCore_1 = require("./parsePathCore");
function parsePath(input, options) {
    try {
        return (0, parsePathCore_1.parsePathCore)(input);
    }
    catch (e) {
        if (!(options === null || options === void 0 ? void 0 : options.noThrow) && !(options === null || options === void 0 ? void 0 : options.unsafeReturn)) {
            throw (0, err_code_1.default)(e, {
                originalInput: input,
                options,
            });
        }
    }
    if (options === null || options === void 0 ? void 0 : options.unsafeReturn) {
        return {
            ns: "ipfs" /* ipfs */,
            hash: input,
            path: '',
        };
    }
}
exports.parsePath = parsePath;
//# sourceMappingURL=parsePath.js.map