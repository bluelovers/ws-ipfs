"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._remove_path_prefix = exports._if_path_can_be_cid = exports._url_href = exports._assertCID = void 0;
const tslib_1 = require("tslib");
const multiformats_1 = require("multiformats");
const err_code_1 = tslib_1.__importDefault(require("err-code"));
const is_ipfs_1 = require("is-ipfs");
function _assertCID(hash) {
    let bool;
    if (typeof hash === 'string') {
        bool = Boolean(multiformats_1.CID.parse(hash));
    }
    else if (hash instanceof Uint8Array) {
        bool = Boolean(multiformats_1.CID.decode(hash));
    }
    else if (hash) {
        bool = Boolean(multiformats_1.CID.asCID(hash));
    }
    if (!bool) {
        throw (0, err_code_1.default)(new TypeError(`Invalid hash: ${hash}`), {
            hash,
        });
    }
}
exports._assertCID = _assertCID;
exports.default = _assertCID;
function _url_href(input) {
    var _a, _b, _c;
    return (_c = (_b = (_a = input).toRealString) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : input.toString();
}
exports._url_href = _url_href;
function _if_path_can_be_cid(cidInput) {
    return (0, is_ipfs_1.cid)(_remove_path_prefix(cidInput));
}
exports._if_path_can_be_cid = _if_path_can_be_cid;
function _remove_path_prefix(cidInput) {
    return cidInput.replace(/^\/?ip[fn]s\//, '');
}
exports._remove_path_prefix = _remove_path_prefix;
//# sourceMappingURL=index.js.map