"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleFromURL = exports.subdomainGatewayPattern = void 0;
const tslib_1 = require("tslib");
const is_ipfs_1 = tslib_1.__importDefault(require("is-ipfs"));
const lazy_url_1 = require("lazy-url");
const is_cid_1 = require("@lazy-ipfs/is-cid");
exports.subdomainGatewayPattern = /^https?:\/\/([^/]+)\.(ip[fn]s)\.[^/?]+/;
function _handleFromURL(input) {
    var _a;
    input = (0, is_cid_1._url_href)(input);
    if (is_ipfs_1.default.cidPath(input)) {
        return input;
    }
    else if (!/^\w+(?:[+\-]\w+)?:\/\//.test(input)) {
        return;
    }
    let url = new lazy_url_1.LazyURL(input);
    let parts;
    if (is_ipfs_1.default.subdomain(url.origin)) {
        parts = url.origin.match(exports.subdomainGatewayPattern);
        return {
            ns: parts[2],
            hash: parts[1],
            path: url.pathname,
        };
    }
    else if (is_ipfs_1.default.cid((parts = url.host.split('.'))[0])) {
        return {
            ns: ((_a = parts[1]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "ipns" /* EnumParsePathResultNs.ipns */
                ? "ipns" /* EnumParsePathResultNs.ipns */
                : "ipfs" /* EnumParsePathResultNs.ipfs */,
            hash: parts[0],
            path: url.pathname,
        };
    }
    else if (is_ipfs_1.default.path(url.pathname)) {
        return url.pathname;
    }
}
exports._handleFromURL = _handleFromURL;
//# sourceMappingURL=_handleFromURL.js.map