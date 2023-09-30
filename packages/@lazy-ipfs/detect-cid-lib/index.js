"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeofRawCID = exports.typeofCID = exports.EnumTypeofCID = exports.SymbolJsCID = void 0;
const tslib_1 = require("tslib");
const js_multiformats_1 = require("./lib/js-multiformats");
const js_cids_1 = require("./lib/js-cids");
const err_code_1 = tslib_1.__importDefault(require("err-code"));
var js_cids_2 = require("./lib/js-cids");
Object.defineProperty(exports, "SymbolJsCID", { enumerable: true, get: function () { return js_cids_2.SymbolJsCID; } });
tslib_1.__exportStar(require("./lib/js-cids"), exports);
tslib_1.__exportStar(require("./lib/js-multiformats"), exports);
tslib_1.__exportStar(require("./lib/util"), exports);
tslib_1.__exportStar(require("./lib/types"), exports);
var EnumTypeofCID;
(function (EnumTypeofCID) {
    /**
     * for typo
     * @deprecated
     */
    EnumTypeofCID["js_cid"] = "@ipld/js-cid/CID";
    EnumTypeofCID["js_cids"] = "@ipld/js-cid/CID";
    EnumTypeofCID["multiformats_cid"] = "@ipld/js-multiformats/CID";
    EnumTypeofCID["js_multiformats"] = "@ipld/js-multiformats/CID";
    EnumTypeofCID["js_multiformat"] = "@ipld/js-multiformats/CID";
})(EnumTypeofCID || (exports.EnumTypeofCID = EnumTypeofCID = {}));
function typeofCID(cid, throwError) {
    if ((0, js_multiformats_1.isMultiformatsCID)(cid)) {
        return "@ipld/js-multiformats/CID" /* EnumTypeofCID.multiformats_cid */;
    }
    else if ((0, js_cids_1.isJsCID)(cid)) {
        return "@ipld/js-cid/CID" /* EnumTypeofCID.js_cids */;
    }
    else if (throwError) {
        throw (0, err_code_1.default)(new TypeError(`Unknown type of cid`), {
            input: cid,
        });
    }
}
exports.typeofCID = typeofCID;
function typeofRawCID(cid, throwError) {
    if ((0, js_multiformats_1.isRawMultiformatsCIDLike)(cid)) {
        return "@ipld/js-multiformats/CID" /* EnumTypeofCID.multiformats_cid */;
    }
    else if ((0, js_cids_1.isRawJsCIDLike)(cid)) {
        return "@ipld/js-cid/CID" /* EnumTypeofCID.js_cids */;
    }
    else if (throwError) {
        throw (0, err_code_1.default)(new TypeError(`Unknown type of raw cid`), {
            input: cid,
        });
    }
}
exports.typeofRawCID = typeofRawCID;
exports.default = typeofCID;
//# sourceMappingURL=index.js.map