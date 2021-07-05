"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const tslib_1 = require("tslib");
const util_1 = require("../util");
const compatible_add_1 = (0, tslib_1.__importDefault)(require("@lazy-ipfs/compatible-add"));
async function add(ipfs) {
    const file = {
        path: 'myfile.txt',
        content: 'ABC',
    };
    return (0, util_1.runSubCheck)(async () => {
        // @ts-ignore
        for await (const result of (0, compatible_add_1.default)(ipfs, file, {
            timeout: 5000,
            pin: false,
        })) {
            if (result.path === file.path && result.size) {
                return true;
            }
        }
    });
}
exports.add = add;
exports.default = add;
//# sourceMappingURL=add.js.map