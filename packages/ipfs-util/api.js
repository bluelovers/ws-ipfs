"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsGatewayAddresses = exports.ipfsApiAddresses = exports.ipfsAddresses = exports.checkIPFS = void 0;
async function checkIPFS(ipfs) {
    let bool;
    const timeout = 2000;
    //await ipfs.id();
    bool = await ipfs
        .version({
        timeout,
    })
        .then(v => !!v);
    if (!bool) {
        bool = await ipfs
            .id({
            timeout,
        })
            .then(v => !!v);
    }
    return bool;
}
exports.checkIPFS = checkIPFS;
async function ipfsAddresses(ipfs) {
    return ipfs.config.get('Addresses');
}
exports.ipfsAddresses = ipfsAddresses;
async function ipfsApiAddresses(ipfs) {
    return ipfs.config.get('Addresses.API');
}
exports.ipfsApiAddresses = ipfsApiAddresses;
async function ipfsGatewayAddresses(ipfs) {
    return ipfs.config.get('Addresses.Gateway');
}
exports.ipfsGatewayAddresses = ipfsGatewayAddresses;
//# sourceMappingURL=api.js.map