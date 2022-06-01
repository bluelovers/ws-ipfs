"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._pokeError = exports._parsePokeResponse = void 0;
const tslib_1 = require("tslib");
const parse_ipfs_from_header_1 = tslib_1.__importDefault(require("@lazy-ipfs/parse-ipfs-from-header"));
function _parsePokeResponse(res) {
    const { headers, status, statusText } = res;
    const xIpfsPath = (0, parse_ipfs_from_header_1.default)(headers).xIpfsPath;
    if (xIpfsPath) {
        return {
            value: xIpfsPath,
            status,
            statusText,
            headers,
            href: res.url,
        };
    }
    else if (status < 200 || status >= 400) {
        return {
            value: false,
            status,
            statusText,
            headers,
            href: res.url,
        };
    }
    return {
        value: null,
        status,
        statusText,
        headers,
        href: res.url,
    };
}
exports._parsePokeResponse = _parsePokeResponse;
function _pokeError(error, href) {
    return {
        error,
        href,
    };
}
exports._pokeError = _pokeError;
//# sourceMappingURL=_parsePokeResponse.js.map