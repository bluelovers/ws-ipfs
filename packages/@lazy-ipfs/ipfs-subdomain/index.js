"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsSubdomain = exports.ipfsSubdomainURL2 = exports._handleOptions = exports.ipfsSubdomainURL = exports.toSubdomainCID = exports.getGatewayDomain = exports.assertGatewayDomain = exports.isIPFSAddressesLikeWithGatewayDomain = exports.assertIPFSAddressesLikeWithGatewayDomain = void 0;
/**
 * Created by user on 2020/5/17.
 */
const to_cid_1 = require("@lazy-ipfs/to-cid");
const ipfs_server_list_1 = require("ipfs-server-list");
const parsePath_1 = require("@lazy-ipfs/parse-ipfs-path/lib/parsePath");
const cid_to_string_1 = require("@lazy-ipfs/cid-to-string");
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
    return (0, cid_to_string_1.cidToBase32)((0, to_cid_1.toCID)(cid));
}
exports.toSubdomainCID = toSubdomainCID;
/**
 * @deprecated use {@link ipfsSubdomainURL2}
 */
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
function _handleOptions(cid, gatewayDomain, protocol, options) {
    if (protocol !== null && typeof protocol === 'object' && !options) {
        options = protocol;
        protocol = undefined;
    }
    options !== null && options !== void 0 ? options : (options = {});
    gatewayDomain !== null && gatewayDomain !== void 0 ? gatewayDomain : (gatewayDomain = options.gatewayDomain);
    protocol !== null && protocol !== void 0 ? protocol : (protocol = options.protocol);
    return {
        cid,
        gatewayDomain,
        protocol,
        options,
    };
}
exports._handleOptions = _handleOptions;
function ipfsSubdomainURL2(cid, gatewayDomain, protocol, options) {
    var _a;
    ({
        cid,
        gatewayDomain,
        protocol,
        options,
    } = _handleOptions(cid, gatewayDomain, protocol, options));
    let url = ipfsSubdomainURL(cid, gatewayDomain, protocol);
    if (options.clearPathname) {
        url.pathname = '';
    }
    if ((_a = options.filename) === null || _a === void 0 ? void 0 : _a.length) {
        url.searchParams.set('filename', options.filename);
    }
    return url;
}
exports.ipfsSubdomainURL2 = ipfsSubdomainURL2;
function ipfsSubdomain(cid, gatewayDomain, protocol, options) {
    return ipfsSubdomainURL2(cid, gatewayDomain, protocol, options).href;
}
exports.ipfsSubdomain = ipfsSubdomain;
exports.default = ipfsSubdomain;
//# sourceMappingURL=index.js.map