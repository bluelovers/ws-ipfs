"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refs = void 0;
const util_1 = require("../util");
async function refs(ipfs) {
    const ipfsPath = '/ipfs/QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF';
    return await (0, util_1.runSubCheck)(async () => {
        for await (const ref of ipfs.refs(ipfsPath, { recursive: true, timeout: 5000 })) {
            return ref === null || ref === void 0 ? void 0 : ref.ref;
        }
    });
}
exports.refs = refs;
exports.default = refs;
//# sourceMappingURL=refs.js.map