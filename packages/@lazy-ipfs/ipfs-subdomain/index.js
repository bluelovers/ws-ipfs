"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsSubdomain = exports.ipfsSubdomainURL = exports.toSubdomainCID = exports.getGatewayDomain = exports.assertGatewayDomain = exports.isIPFSAddressesLikeWithGatewayDomain = exports.assertIPFSAddressesLikeWithGatewayDomain = void 0;
const tslib_1 = require("tslib");
const to_cid_1 = (0, tslib_1.__importDefault)(require("@lazy-ipfs/to-cid"));
const ipfs_server_list_1 = require("ipfs-server-list");
const parsePath_1 = require("@lazy-ipfs/parse-ipfs-path/lib/parsePath");
const defaultGatewayDomain = (0, ipfs_server_list_1.getIpfsServerList)().cloudflare.GatewayDomain;
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
function toSubdomainCID(cid) {
    return (0, to_cid_1.default)(cid).toV1().toBaseEncodedString('base32');
}
exports.toSubdomainCID = toSubdomainCID;
function ipfsSubdomainURL(cid, gatewayDomain, protocol) {
    if (typeof cid === 'string') {
        let result = (0, parsePath_1.parsePath)(cid, {
            noThrow: true,
        });
        if (result === null || result === void 0 ? void 0 : result.hash) {
            cid = result;
        }
    }
    let path = '';
    if ((0, parsePath_1.isParsePathResult)(cid)) {
        path = cid.path;
        cid = cid.hash;
    }
    cid = toSubdomainCID(cid);
    gatewayDomain = getGatewayDomain(gatewayDomain !== null && gatewayDomain !== void 0 ? gatewayDomain : defaultGatewayDomain);
    assertGatewayDomain(gatewayDomain);
    return new URL(`${protocol || 'https:'}//${cid}${gatewayDomain}${path !== null && path !== void 0 ? path : ''}`);
}
exports.ipfsSubdomainURL = ipfsSubdomainURL;
function ipfsSubdomain(cid, gatewayDomain, protocol, options) {
    if (protocol !== null && typeof protocol === 'object' && !options) {
        options = protocol;
        protocol = undefined;
    }
    options !== null && options !== void 0 ? options : (options = {});
    gatewayDomain !== null && gatewayDomain !== void 0 ? gatewayDomain : (gatewayDomain = options.gatewayDomain);
    protocol !== null && protocol !== void 0 ? protocol : (protocol = options.protocol);
    let url = ipfsSubdomainURL(cid, gatewayDomain, protocol);
    if (options === null || options === void 0 ? void 0 : options.clearPathname) {
        url.pathname = '';
    }
    return url.href;
}
exports.ipfsSubdomain = ipfsSubdomain;
exports.default = ipfsSubdomain;
//# sourceMappingURL=index.js.map