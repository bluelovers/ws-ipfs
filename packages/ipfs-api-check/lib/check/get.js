"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const tslib_1 = require("tslib");
const bl_1 = tslib_1.__importDefault(require("bl"));
const util_1 = require("../util");
async function get(ipfs) {
    const cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
    const expected = 'Hello from IPFS Gateway Checker\n';
    return (0, util_1.runSubCheck)(async () => {
        let success;
        for await (const file of ipfs.get(cid, {
            timeout: 5000,
        })) {
            if (file.path === cid && !file.content) {
                continue;
            }
            const content = new bl_1.default();
            for await (const chunk of file.content) {
                content.append(chunk);
            }
            success = content.toString() === expected;
        }
        return success;
    });
}
exports.get = get;
exports.default = get;
//# sourceMappingURL=get.js.map