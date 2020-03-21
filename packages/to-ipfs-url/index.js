"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLink = exports.toPath = exports.toURL = exports.pathToCid = exports.isCidOrPath = exports.isPath = exports.EnumIPFSLinkType = void 0;
const is_ipfs_1 = __importDefault(require("is-ipfs"));
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
    return is_ipfs_1.default.path(cid) || is_ipfs_1.default.ipnsPath(cid) || is_ipfs_1.default.cidPath(cid);
}
exports.isPath = isPath;
function isCidOrPath(cid) {
    return is_ipfs_1.default.cid(cid) || isPath(cid);
}
exports.isCidOrPath = isCidOrPath;
function pathToCid(cid) {
    return cid.replace(/^\/ip[nf]s\//, '');
}
exports.pathToCid = pathToCid;
function toURL(cid, options = {}) {
    if (typeof options === 'string') {
        options = {
            filename: options,
        };
    }
    if (!options.ignoreCheck && !isCidOrPath(cid)) {
        throw new TypeError(`cid '${cid}' is not valid ipfs`);
    }
    let { filename, type } = options || {};
    let prefix = `https://ipfs.io/ipfs/`;
    switch (type) {
        case EnumIPFSLinkType.IPLD:
            prefix = `https://explore.ipld.io/#/explore/`;
            break;
        case EnumIPFSLinkType.IPNS:
            //prefix = `https://gateway.ipfs.io/ipns/`;
            prefix = `https://ipfs.io/ipns/`;
            break;
    }
    if (isPath(cid)) {
        cid = pathToCid(cid);
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