"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cat = void 0;
const util_1 = require("../util");
/**
 * https://ipfs.infura.io/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
 */
async function cat(ipfs) {
    const ipfsPath = '/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
    const expected = 'Hello from IPFS Gateway Checker\n';
    return util_1.runSubCheck(async () => {
        const chunks = [];
        for await (const chunk of ipfs.cat(ipfsPath, {
            timeout: 5000,
        })) {
            chunks.push(chunk);
        }
        const content = Buffer.concat(chunks).toString();
        return content === expected;
    });
}
exports.cat = cat;
exports.default = cat;
//# sourceMappingURL=cat.js.map