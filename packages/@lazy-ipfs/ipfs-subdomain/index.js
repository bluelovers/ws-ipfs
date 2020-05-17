"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsSubdomain = exports.ipfsSubdomainURL = exports.getGatewayDomain = exports.assertGatewayDomain = exports.isIPFSAddressesLikeWithGatewayDomain = exports.assertIPFSAddressesLikeWithGatewayDomain = void 0;
const to_cid_1 = __importDefault(require("@lazy-ipfs/to-cid"));
const ipfs_server_list_1 = require("ipfs-server-list");
const defaultGatewayDomain = ipfs_server_list_1.getIpfsServerList().cloudflare.GatewayDomain;
function assertIPFSAddressesLikeWithGatewayDomain(gatewayDomain) {
    if (isIPFSAddressesLikeWithGatewayDomain(gatewayDomain)) {
        return;
    }
    throw new TypeError(`Cannot read property 'GatewayDomain' of gatewayDomain: ${gatewayDomain}`);
}
exports.assertIPFSAddressesLikeWithGatewayDomain = assertIPFSAddressesLikeWithGatewayDomain;
function isIPFSAddressesLikeWithGatewayDomain(gatewayDomain) {
    return (typeof (gatewayDomain === null || gatewayDomain === void 0 ? void 0 : gatewayDomain.GatewayDomain) === 'string' && gatewayDomain.GatewayDomain.length);
}
exports.isIPFSAddressesLikeWithGatewayDomain = isIPFSAddressesLikeWithGatewayDomain;
function assertGatewayDomain(gatewayDomain) {
    gatewayDomain = getGatewayDomain(gatewayDomain);
    if (typeof gatewayDomain !== 'string' || !gatewayDomain.length) {
        throw new TypeError(`gatewayDomain must is IIPFSAddressesLike or string`);
    }
}
exports.assertGatewayDomain = assertGatewayDomain;
function getGatewayDomain(gatewayDomain) {
    if (typeof gatewayDomain !== 'string') {
        gatewayDomain = gatewayDomain.GatewayDomain;
    }
    return gatewayDomain;
}
exports.getGatewayDomain = getGatewayDomain;
function ipfsSubdomainURL(cid, gatewayDomain = defaultGatewayDomain, protocol = 'https:') {
    cid = to_cid_1.default(cid).toV1().toBaseEncodedString('base32');
    gatewayDomain = getGatewayDomain(gatewayDomain);
    assertGatewayDomain(gatewayDomain);
    return new URL(`${protocol || 'https:'}//${cid}${gatewayDomain}`);
}
exports.ipfsSubdomainURL = ipfsSubdomainURL;
function ipfsSubdomain(cid, gatewayDomain, protocol) {
    return ipfsSubdomainURL(cid, gatewayDomain, protocol).href;
}
exports.ipfsSubdomain = ipfsSubdomain;
exports.default = ipfsSubdomain;
//# sourceMappingURL=index.js.map