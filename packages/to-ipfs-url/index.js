"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLink = exports.toPath = exports.toURL = exports.pathToCid = exports.pathToCidSource = exports.isCidOrPath = exports.isPath = exports.EnumIPFSLinkType = void 0;
const tslib_1 = require("tslib");
const is_ipfs_1 = tslib_1.__importDefault(require("is-ipfs"));
const ipfs_server_list_1 = tslib_1.__importDefault(require("ipfs-server-list"));
const to_cid_1 = require("@lazy-ipfs/to-cid");
const cid_to_string_1 = require("@lazy-ipfs/cid-to-string");
const parsePath_1 = require("@lazy-ipfs/parse-ipfs-path/lib/parsePath");
const err_code_1 = tslib_1.__importDefault(require("err-code"));
const _invalidInput_1 = require("@lazy-ipfs/parse-ipfs-path/lib/_invalidInput");
const util_1 = require("@lazy-ipfs/parse-ipfs-path/lib/util");
const formatter_1 = require("@lazy-ipfs/parse-ipfs-path/lib/formatter");
var EnumIPFSLinkType;
(function (EnumIPFSLinkType) {
    EnumIPFSLinkType["ipfs"] = "ipfs";
    EnumIPFSLinkType["ipld"] = "ipld";
    EnumIPFSLinkType["ipns"] = "ipns";
    EnumIPFSLinkType["Gateway"] = "ipfs";
    EnumIPFSLinkType["IPFS"] = "ipfs";
    EnumIPFSLinkType["IPLD"] = "ipld";
    EnumIPFSLinkType["IPNS"] = "ipns";
})(EnumIPFSLinkType = exports.EnumIPFSLinkType || (exports.EnumIPFSLinkType = {}));
function isPath(cid) {
    if ((0, to_cid_1.isCID)(cid) || (0, util_1._parsedPathIsCid)(cid)) {
        return false;
    }
    // @ts-ignore
    return is_ipfs_1.default.path(cid) || is_ipfs_1.default.ipnsPath(cid) || is_ipfs_1.default.cidPath(cid);
}
exports.isPath = isPath;
function isCidOrPath(cid) {
    return is_ipfs_1.default.cid(cid) || isPath(cid) || (0, to_cid_1.isCID)(cid);
}
exports.isCidOrPath = isCidOrPath;
function pathToCidSource(cid) {
    if (!cid) {
        throw (0, err_code_1.default)(new TypeError(`Invalid input: ${cid}`), {
            cid,
        });
    }
    return (0, parsePath_1.parsePath)(cid);
}
exports.pathToCidSource = pathToCidSource;
/**
 * @deprecated
 */
function pathToCid(cid) {
    if ((0, _invalidInput_1._invalidInput)(cid)) {
        throw (0, err_code_1.default)(new TypeError(`Invalid input: ${cid}`), {
            input: cid,
        });
    }
    return pathToCidSource(cid).toString();
}
exports.pathToCid = pathToCid;
function toURL(cid, options = {}) {
    var _a, _b, _c, _d, _e, _f;
    if ((0, _invalidInput_1._invalidInput)(cid)) {
        throw (0, err_code_1.default)(new TypeError(`Invalid input: ${cid}`), {
            input: cid,
        });
    }
    if (typeof options === 'string') {
        options = {
            filename: options,
        };
    }
    cid = pathToCidSource(cid);
    if (!options.ignoreCheck && !(0, util_1.isParsePathResultLoose)(cid) && !isCidOrPath(cid)) {
        throw (0, err_code_1.default)(new TypeError(`cid '${cid}' is not valid ipfs`), {
            cid,
            options,
        });
    }
    let { filename, type } = options || {};
    let prefix = (_b = (_a = options.prefix) === null || _a === void 0 ? void 0 : _a.ipfs) !== null && _b !== void 0 ? _b : ipfs_server_list_1.default.ipfs.Gateway;
    switch (type) {
        case EnumIPFSLinkType.IPLD:
            prefix = (_d = (_c = options.prefix) === null || _c === void 0 ? void 0 : _c.ipld) !== null && _d !== void 0 ? _d : `https://explore.ipld.io/#/explore/`;
            break;
        case EnumIPFSLinkType.IPNS:
            //prefix = `https://gateway.ipfs.io/ipns/`;
            prefix = (_f = (_e = options.prefix) === null || _e === void 0 ? void 0 : _e.ipns) !== null && _f !== void 0 ? _f : `https://ipfs.io/ipns/`;
            break;
    }
    if ((0, to_cid_1.isCID)(cid)) {
        cid = (0, cid_to_string_1.cidToString)(cid);
    }
    else {
        let ret = (0, parsePath_1.parsePath)(cid);
        cid = (0, formatter_1.resultToPathWithNs)(ret);
    }
    let url = new URL(`${prefix}${cid}`);
    if (typeof filename === 'string' && filename.length > 0) {
        url.searchParams.set('filename', filename);
    }
    return url;
}
exports.toURL = toURL;
function toPath(cid, options) {
    return toURL(cid, options).pathname;
}
exports.toPath = toPath;
function toLink(cid, options) {
    return toURL(cid, options).href;
}
exports.toLink = toLink;
exports.default = toURL;
//# sourceMappingURL=index.js.map