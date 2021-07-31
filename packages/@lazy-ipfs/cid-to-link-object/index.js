"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cidToLinkObjectLike = exports.toLinkObjectLike = void 0;
function toLinkObjectLike(cid) {
    return {
        '/': cid,
    };
}
exports.toLinkObjectLike = toLinkObjectLike;
function cidToLinkObjectLike(cid, handler) {
    handler !== null && handler !== void 0 ? handler : (handler = cid => cid.toString());
    return toLinkObjectLike(handler(cid));
}
exports.cidToLinkObjectLike = cidToLinkObjectLike;
exports.default = cidToLinkObjectLike;
//# sourceMappingURL=index.js.map