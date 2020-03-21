"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cat = void 0;
/**
 * https://ipfs.infura.io/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
 */
async function cat(ipfs) {
    const ipfsPath = '/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
    const expected = 'Hello from IPFS Gateway Checker\n';
    const startTime = Date.now();
    let success = false;
    let error;
    await Promise.resolve()
        .then(async () => {
        const chunks = [];
        for await (const chunk of ipfs.cat(ipfsPath, {
            timeout: 5000,
        })) {
            chunks.push(chunk);
        }
        const content = Buffer.concat(chunks).toString();
        success = content === expected;
    })
        .catch(e => {
        error = e;
    });
    return {
        success,
        spendTime: Date.now() - startTime,
        error,
    };
}
exports.cat = cat;
exports.default = cat;
//# sourceMappingURL=cat.js.map