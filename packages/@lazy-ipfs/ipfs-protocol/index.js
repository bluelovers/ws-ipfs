"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsProtocol = exports.ipfsProtocolURL = void 0;
function ipfsProtocolURL(cid, pathname) {
    let url = new URL(`ipfs://${cid}`);
    url.pathname = pathname;
    return url;
}
exports.ipfsProtocolURL = ipfsProtocolURL;
function ipfsProtocol(cid, pathname) {
    return ipfsProtocolURL(cid, pathname).href;
}
exports.ipfsProtocol = ipfsProtocol;
exports.default = ipfsProtocol;
//# sourceMappingURL=index.js.map