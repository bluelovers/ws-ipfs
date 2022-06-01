"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleLibCID = void 0;
const tslib_1 = require("tslib");
const cids_1 = tslib_1.__importDefault(require("cids"));
const multiformats_1 = require("multiformats");
function _handleLibCID(libCID, defaultLibCID) {
    if (libCID === "@ipld/js-cid/CID" /* EnumTypeofCID.js_cids */) {
        return cids_1.default;
    }
    else if (libCID === "@ipld/js-multiformats/CID" /* EnumTypeofCID.js_multiformats */) {
        return multiformats_1.CID;
    }
    return libCID !== null && libCID !== void 0 ? libCID : defaultLibCID;
}
exports._handleLibCID = _handleLibCID;
//# sourceMappingURL=_handleLibCID.js.map