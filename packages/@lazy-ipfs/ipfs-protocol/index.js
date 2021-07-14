"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipnsProtocol = exports.ipfsProtocol = exports.ipfsProtocolURL = exports.ipnsProtocolURL = exports._ipfsProtocolURL = void 0;
function _ipfsProtocolURL(options) {
    var _a, _b, _c;
    let cid = (_a = options.cid) !== null && _a !== void 0 ? _a : options.hash;
    let ns = (_b = options.ns) !== null && _b !== void 0 ? _b : 'ipfs';
    let url = new URL(`${ns}://${cid}`);
    let pathname = (_c = options.pathname) !== null && _c !== void 0 ? _c : options.path;
    if (typeof pathname === 'string' && pathname.length) {
        url.pathname = pathname;
    }
    return url;
}
exports._ipfsProtocolURL = _ipfsProtocolURL;
function ipnsProtocolURL(cid, pathname) {
    if (typeof pathname !== 'object') {
        pathname = {
            pathname,
        };
    }
    return _ipfsProtocolURL({
        ...pathname,
        ns: 'ipns',
        cid,
    });
}
exports.ipnsProtocolURL = ipnsProtocolURL;
function ipfsProtocolURL(cid, pathname) {
    if (typeof pathname !== 'object') {
        pathname = {
            pathname,
        };
    }
    return _ipfsProtocolURL({
        ...pathname,
        ns: 'ipfs',
        cid,
    });
}
exports.ipfsProtocolURL = ipfsProtocolURL;
function ipfsProtocol(cid, pathname) {
    return ipfsProtocolURL(cid, pathname).href;
}
exports.ipfsProtocol = ipfsProtocol;
function ipnsProtocol(cid, pathname) {
    return ipnsProtocolURL(cid, pathname).href;
}
exports.ipnsProtocol = ipnsProtocol;
exports.default = ipfsProtocol;
//# sourceMappingURL=index.js.map