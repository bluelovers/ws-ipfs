"use strict";
/**
 * Created by user on 2020/5/17.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCID = exports.toRawCID = exports.isRawCIDLike = exports.assertRawCIDLike = exports.isCID = exports.hasCIDSymbol = exports.classCID = exports.getSymbolCID = exports.SymbolCID = void 0;
const cids_1 = __importDefault(require("cids"));
const symbolName = '@ipld/js-cid/CID';
exports.SymbolCID = Symbol.for(symbolName);
function getSymbolCID() {
    const symbolName = '@ipld/js-cid/CID';
    return Symbol.for(symbolName);
}
exports.getSymbolCID = getSymbolCID;
function classCID(libCID) {
    // @ts-ignore
    return (libCID !== null && libCID !== void 0 ? libCID : cids_1.default);
}
exports.classCID = classCID;
function hasCIDSymbol(cid) {
    return (cid === null || cid === void 0 ? void 0 : cid[exports.SymbolCID]) === true;
}
exports.hasCIDSymbol = hasCIDSymbol;
function isCID(cid, libCID) {
    return classCID(libCID).isCID(cid);
}
exports.isCID = isCID;
function assertRawCIDLike(cid) {
    if (!isRawCIDLike(cid)) {
        throw new TypeError(`cid not a valid CID like data`);
    }
}
exports.assertRawCIDLike = assertRawCIDLike;
function isRawCIDLike(cid) {
    var _a, _b, _c;
    return (!isUndefined(cid === null || cid === void 0 ? void 0 : cid.version) && ((_a = cid === null || cid === void 0 ? void 0 : cid.codec) === null || _a === void 0 ? void 0 : _a.length) && ((_b = cid === null || cid === void 0 ? void 0 : cid.multihash) === null || _b === void 0 ? void 0 : _b.length) && ((_c = cid === null || cid === void 0 ? void 0 : cid.multibaseName) === null || _c === void 0 ? void 0 : _c.length));
}
exports.isRawCIDLike = isRawCIDLike;
function toRawCID(cid) {
    assertRawCIDLike(cid);
    const { version, codec, multihash, multibaseName, } = cid;
    return {
        version,
        codec,
        multihash,
        multibaseName,
    };
}
exports.toRawCID = toRawCID;
function toCID(cid, libCID) {
    libCID = classCID(libCID);
    if (isRawCIDLike(cid)) {
        const { version, codec, multihash, multibaseName, } = cid;
        return new libCID(version, codec, multihash, multibaseName);
    }
    return new libCID(cid);
}
exports.toCID = toCID;
exports.default = toCID;
function isUndefined(target) {
    return target === null || target === void 0;
}
//# sourceMappingURL=index.js.map