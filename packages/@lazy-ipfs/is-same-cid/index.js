"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameCID = void 0;
const to_cid_1 = require("@lazy-ipfs/to-cid");
const index_1 = require("@lazy-ipfs/cid-to-string/index");
function isSameCID(a, b, libCID) {
    if (a && b) {
        let c;
        if ((0, index_1.cidToQmHash)(c = (0, to_cid_1.toCID)(a, libCID)) === (0, index_1.cidToQmHash)((0, to_cid_1.toCID)(b, libCID))) {
            return c;
        }
        return false;
    }
    return null;
}
exports.isSameCID = isSameCID;
exports.default = isSameCID;
//# sourceMappingURL=index.js.map