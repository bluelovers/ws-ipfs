"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const util_1 = require("../util");
const compatible_add_1 = __importDefault(require("@lazy-ipfs/compatible-add"));
async function add(ipfs) {
    const file = {
        path: 'myfile.txt',
        content: 'ABC',
    };
    return util_1.runSubCheck(async () => {
        // @ts-ignore
        for await (const result of compatible_add_1.default(ipfs, file, {
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