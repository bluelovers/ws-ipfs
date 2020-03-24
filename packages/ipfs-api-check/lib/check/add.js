"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const util_1 = require("../util");
async function add(ipfs) {
    const file = {
        path: 'myfile.txt',
        content: 'ABC',
    };
    return util_1.runSubCheck(async () => {
        for await (const result of ipfs.add(file, {
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