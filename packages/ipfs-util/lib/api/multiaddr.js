"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsGatewayAddressesLink = exports.ipfsWebuiAddresses = exports.ipfsApiAddressesLink = void 0;
const tslib_1 = require("tslib");
const multiaddr_to_url_1 = (0, tslib_1.__importDefault)(require("multiaddr-to-url"));
const api_1 = require("../../api");
async function ipfsApiAddressesLink(ipfs, opts) {
    return (0, api_1.ipfsApiAddresses)(ipfs)
        .then(api => {
        return (0, multiaddr_to_url_1.default)(api, opts).href;
    });
}
exports.ipfsApiAddressesLink = ipfsApiAddressesLink;
async function ipfsWebuiAddresses(ipfs, opts) {
    return (0, api_1.ipfsApiAddresses)(ipfs)
        .then(api => {
        const url = (0, multiaddr_to_url_1.default)(api, opts);
        url.pathname = 'webui';
        return url.href;
    });
}
exports.ipfsWebuiAddresses = ipfsWebuiAddresses;
async function ipfsGatewayAddressesLink(ipfs, opts) {
    return (0, api_1.ipfsGatewayAddresses)(ipfs)
        .then(api => {
        const url = (0, multiaddr_to_url_1.default)(api, opts);
        url.pathname = 'ipfs/';
        return url.href;
    });
}
exports.ipfsGatewayAddressesLink = ipfsGatewayAddressesLink;
//# sourceMappingURL=multiaddr.js.map