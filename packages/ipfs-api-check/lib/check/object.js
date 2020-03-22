"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = void 0;
const util_1 = require("../util");
async function object(ipfs) {
    const multihash = 'QmPb5f92FxKPYdT3QNBd1GKiL4tZUXUrzF4Hkpdr3Gf1gK';
    const get = await util_1.runSubCheck(async () => {
        const node = await ipfs.object.get(multihash, {
            timeout: 5000,
        });
        return node.size;
    });
    const data = await util_1.runSubCheck(async () => {
        const node = await ipfs.object.data(multihash, {
            timeout: 5000,
        });
        return util_1.isBufferMaybe(node);
    });
    const stat = await util_1.runSubCheck(async () => {
        const node = await ipfs.object.stat(multihash, {
            timeout: 5000,
        });
        return node.Hash;
    });
    return {
        get,
        data,
        stat,
    };
}
exports.object = object;
exports.default = object;
//# sourceMappingURL=object.js.map