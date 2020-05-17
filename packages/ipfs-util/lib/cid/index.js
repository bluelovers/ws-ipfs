"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cidToBase32 = void 0;
const to_cid_1 = __importDefault(require("@lazy-ipfs/to-cid"));
/**
 * https://blog.cloudflare.com/continuing-to-improve-our-ipfs-gateway/
 * @example
 * console.dir(cidToBase32(new CID('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco')))
 * console.dir(cidToBase32('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco'))
 */
function cidToBase32(cid) {
    return to_cid_1.default(cid).toV1().toBaseEncodedString('base32');
}
exports.cidToBase32 = cidToBase32;
//# sourceMappingURL=index.js.map