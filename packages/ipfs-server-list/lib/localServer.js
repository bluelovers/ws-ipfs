"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalServerValue = exports.localServerInfo = void 0;
/**
 * Created by user on 2020/8/5.
 */
const index_1 = require("../index");
function localServerInfo(options) {
    var _a, _b, _c;
    let host = (options === null || options === void 0 ? void 0 : options.host) || 'localhost';
    let port = (_a = options === null || options === void 0 ? void 0 : options.port) !== null && _a !== void 0 ? _a : 8080;
    let protocol = (_b = options === null || options === void 0 ? void 0 : options.protocol) !== null && _b !== void 0 ? _b : 'http';
    let domain = host;
    if (port) {
        domain += ':' + port;
    }
    return {
        API: {
            port: (_c = options === null || options === void 0 ? void 0 : options.apiPort) !== null && _c !== void 0 ? _c : 5001,
            host,
            protocol,
        },
        Gateway: `${protocol}://${domain}/ipfs/`,
        IPLD: `${protocol}://explore.ipld.io.ipns.${domain}/#/explore/`,
        IPNS: `${protocol}://${domain}/ipns/`,
        GatewayDomain: `.ipfs.${domain}`,
        IPNSDomain: `.ipns.${domain}`,
    };
}
exports.localServerInfo = localServerInfo;
function getLocalServerValue(key, options) {
    return (0, index_1.filterList)(key, {
        localhost: localServerInfo(options),
    })[0];
}
exports.getLocalServerValue = getLocalServerValue;
//# sourceMappingURL=localServer.js.map