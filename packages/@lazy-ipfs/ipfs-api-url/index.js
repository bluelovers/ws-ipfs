"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsGatewayAddressesLink = exports.ipfsWebuiAddresses = exports.ipfsApiAddressesLink = exports.ipfsGatewayAddresses = exports.ipfsApiAddresses = void 0;
const tslib_1 = require("tslib");
const multiaddr_to_url_1 = (0, tslib_1.__importDefault)(require("multiaddr-to-url"));
async function ipfsApiAddresses(ipfs) {
    return ipfs.config.get('Addresses.API');
}
exports.ipfsApiAddresses = ipfsApiAddresses;
async function ipfsGatewayAddresses(ipfs) {
    return ipfs.config.get('Addresses.Gateway');
}
exports.ipfsGatewayAddresses = ipfsGatewayAddresses;
async function ipfsApiAddressesLink(ipfs, opts) {
    return ipfsApiAddresses(ipfs)
        .then(api => {
        return (0, multiaddr_to_url_1.default)(api, opts).href;
    });
}
exports.ipfsApiAddressesLink = ipfsApiAddressesLink;
async function ipfsWebuiAddresses(ipfs, opts) {
    return ipfsApiAddresses(ipfs)
        .then(api => {
        const url = (0, multiaddr_to_url_1.default)(api, opts);
        url.pathname = 'webui';
        return url.href;
    });
}
exports.ipfsWebuiAddresses = ipfsWebuiAddresses;
async function ipfsGatewayAddressesLink(ipfs, opts) {
    return ipfsGatewayAddresses(ipfs)
        .then(api => {
        const url = (0, multiaddr_to_url_1.default)(api, opts);
        url.pathname = 'ipfs/';
        return url.href;
    });
}
exports.ipfsGatewayAddressesLink = ipfsGatewayAddressesLink;
//# sourceMappingURL=index.js.map