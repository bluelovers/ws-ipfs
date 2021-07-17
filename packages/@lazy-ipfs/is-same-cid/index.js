"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameCID = void 0;
const to_cid_1 = require("@lazy-ipfs/to-cid");
function isSameCID(a, b, libCID) {
    if (a && b) {
        let c = (0, to_cid_1.toCID)(a, libCID);
        if (c.toV1().toString('base32') === (0, to_cid_1.toCID)(b, libCID).toV1().toString('base32')) {
            return c;
        }
        return false;
    }
    return null;
}
exports.isSameCID = isSameCID;
exports.default = isSameCID;
//# sourceMappingURL=index.js.map