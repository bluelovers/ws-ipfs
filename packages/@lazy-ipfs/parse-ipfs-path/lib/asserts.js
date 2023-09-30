"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isParsePathResult = exports.assertToParsePathResult = exports.assertToEnumNs = exports.EnumParsePathResultNs = exports.assertToParsePathResultPath = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./util");
const err_code_1 = tslib_1.__importDefault(require("err-code"));
const is_cid_1 = require("@lazy-ipfs/is-cid");
function assertToParsePathResultPath(path) {
    let bool = false;
    if (typeof path === 'string') {
        if ((0, util_1._invalidPath)(path)) {
            bool = true;
        }
    }
    else if (typeof path !== 'undefined' && path !== null) {
        bool = true;
    }
    if (bool) {
        throw (0, err_code_1.default)(new TypeError(`Invalid path: ${path}`), {
            path,
        });
    }
}
exports.assertToParsePathResultPath = assertToParsePathResultPath;
var EnumParsePathResultNs;
(function (EnumParsePathResultNs) {
    EnumParsePathResultNs["ipfs"] = "ipfs";
    EnumParsePathResultNs["ipns"] = "ipns";
})(EnumParsePathResultNs || (exports.EnumParsePathResultNs = EnumParsePathResultNs = {}));
function assertToEnumNs(ns) {
    // @ts-ignore
    if (EnumParsePathResultNs[ns] !== ns) {
        throw (0, err_code_1.default)(new TypeError(`Invalid ns: ${ns}`), {
            ns,
        });
    }
}
exports.assertToEnumNs = assertToEnumNs;
function assertToParsePathResult(result) {
    assertToEnumNs(result.ns);
    if (result.ns !== "ipns" /* EnumParsePathResultNs.ipns */) {
        try {
            (0, is_cid_1._assertCID)(result.hash);
        }
        catch (e) {
            throw (0, err_code_1.default)(e, {
                result,
            });
        }
    }
    assertToParsePathResultPath(result.path);
}
exports.assertToParsePathResult = assertToParsePathResult;
function isParsePathResult(result) {
    try {
        assertToParsePathResult(result);
        return true;
    }
    catch (e) {
    }
    return false;
}
exports.isParsePathResult = isParsePathResult;
//# sourceMappingURL=asserts.js.map