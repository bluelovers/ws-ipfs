"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsAddresses = exports.checkIPFS = exports.isBufferMaybe = void 0;
function isBufferMaybe(buf) {
    return (buf === null || buf === void 0 ? void 0 : buf.length) && typeof (buf === null || buf === void 0 ? void 0 : buf[0]) === 'number';
}
exports.isBufferMaybe = isBufferMaybe;
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
//# sourceMappingURL=index.js.map