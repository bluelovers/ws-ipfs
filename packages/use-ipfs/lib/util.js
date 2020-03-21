"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsAddresses = exports.checkIPFS = void 0;
async function checkIPFS(ipfs) {
    await ipfs.id();
    return true;
}
exports.checkIPFS = checkIPFS;
function ipfsAddresses(ipfs) {
    return ipfs.config.get('Addresses');
}
exports.ipfsAddresses = ipfsAddresses;
//# sourceMappingURL=util.js.map