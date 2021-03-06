"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cidToBase32 = void 0;
const tslib_1 = require("tslib");
const to_cid_1 = (0, tslib_1.__importDefault)(require("@lazy-ipfs/to-cid"));
/**
 * https://blog.cloudflare.com/continuing-to-improve-our-ipfs-gateway/
 * @example
 * console.dir(cidToBase32(new CID('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco')))
 * console.dir(cidToBase32('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco'))
 */
function cidToBase32(cid) {
    return (0, to_cid_1.default)(cid).toV1().toBaseEncodedString('base32');
}
exports.cidToBase32 = cidToBase32;
//# sourceMappingURL=index.js.map