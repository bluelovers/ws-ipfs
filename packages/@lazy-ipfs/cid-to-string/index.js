"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cidToBase32 = exports.cidToQmHash = exports.cidToString = void 0;
const tslib_1 = require("tslib");
const detect_cid_lib_1 = (0, tslib_1.__importDefault)(require("@lazy-ipfs/detect-cid-lib"));
const basics_1 = require("multiformats/basics");
function cidToString(cid, base) {
    const type = (0, detect_cid_lib_1.default)(cid);
    if (typeof base === 'undefined' || base === null) {
        return cid.toString();
    }
    else if (typeof base === 'string') {
        if (type === "@ipld/js-cid/CID" /* js_cids */) {
            return cid.toString(base);
        }
        base = basics_1.bases[base];
    }
    else if (type === "@ipld/js-cid/CID" /* js_cids */) {
        return cid.toString(base.name);
    }
    return cid.toString(base);
}
exports.cidToString = cidToString;
/**
 * default ipfs cid hash
 */
function cidToQmHash(cid) {
    return cidToString(cid.toV0(), 'base58btc');
}
exports.cidToQmHash = cidToQmHash;
/**
 * use for subdomain
 */
function cidToBase32(cid) {
    return cidToString(cid.toV1(), 'base32');
}
exports.cidToBase32 = cidToBase32;
exports.default = cidToString;
//# sourceMappingURL=index.js.map