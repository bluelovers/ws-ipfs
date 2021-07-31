"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getPathFromInput = exports._getCidHashFromInput = void 0;
const tslib_1 = require("tslib");
const to_cid_1 = (0, tslib_1.__importStar)(require("@lazy-ipfs/to-cid"));
const parsePath_1 = require("@lazy-ipfs/parse-ipfs-path/lib/parsePath");
const is_ipfs_1 = (0, tslib_1.__importDefault)(require("is-ipfs"));
const index_1 = require("../index");
const _handleFromURL_1 = require("@lazy-ipfs/parse-ipfs-path/lib/_handleFromURL");
function _getCidHashFromInput(cid) {
    var _a, _b;
    if (is_ipfs_1.default.cid(cid)) {
        return cid;
    }
    else if ((0, index_1.isPath)(cid)) {
        return cid.replace(/^\/ip[nf]s\//, '');
    }
    else if ((0, to_cid_1.isCID)(cid)) {
        return cid;
    }
    cid = (_a = (0, _handleFromURL_1._handleFromURL)(cid)) !== null && _a !== void 0 ? _a : cid;
    if ((0, parsePath_1.isParsePathResultLoose)(cid)) {
        return cid.hash;
    }
    cid = (_b = (0, parsePath_1.parsePath)(cid, {
        noThrow: true,
    })) !== null && _b !== void 0 ? _b : cid;
    if ((0, parsePath_1.isParsePathResultLoose)(cid)) {
        return cid.hash;
    }
    return (0, to_cid_1.default)(cid);
}
exports._getCidHashFromInput = _getCidHashFromInput;
function _getPathFromInput(cid) {
    var _a;
    cid = (_a = (0, _handleFromURL_1._handleFromURL)(cid)) !== null && _a !== void 0 ? _a : cid;
    if ((0, parsePath_1.isParsePathResultLoose)(cid)) {
        return (0, parsePath_1.resultToPath)(cid);
    }
    return _getCidHashFromInput(cid).toString();
}
exports._getPathFromInput = _getPathFromInput;
//# sourceMappingURL=util.js.map