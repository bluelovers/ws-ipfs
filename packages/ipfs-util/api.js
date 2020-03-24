"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsAddresses = exports.checkIPFS = void 0;
async function checkIPFS(ipfs) {
    //await ipfs.id();
    const ret = await ipfs
        .version();
    return !!ret.version;
}
exports.checkIPFS = checkIPFS;
async function ipfsAddresses(ipfs) {
    return ipfs.config.get('Addresses');
}
exports.ipfsAddresses = ipfsAddresses;
//# sourceMappingURL=api.js.map