"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsHash = void 0;
const ipfs_only_hash_1 = require("ipfs-only-hash");
function ipfsHash(input, options) {
    return ipfs_only_hash_1.of(input, options);
}
exports.ipfsHash = ipfsHash;
exports.default = ipfsHash;
//# sourceMappingURL=index.js.map