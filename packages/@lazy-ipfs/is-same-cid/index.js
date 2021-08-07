"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameCID = exports.assertSameCID = exports.newAssertionSameCIDError = void 0;
const to_cid_1 = require("@lazy-ipfs/to-cid");
const index_1 = require("@lazy-ipfs/cid-to-string/index");
const assert_1 = require("assert");
const util_1 = require("util");
function newAssertionSameCIDError(actual, expected) {
    return new assert_1.AssertionError({
        actual: (0, util_1.inspect)(actual),
        expected: (0, util_1.inspect)(expected),
        operator: 'isSameCID',
        stackStartFn: newAssertionSameCIDError,
    });
}
exports.newAssertionSameCIDError = newAssertionSameCIDError;
function assertSameCID(a, b, libCID) {
    let ret = isSameCID(a, b, libCID);
    if (!ret) {
        throw newAssertionSameCIDError(a, b);
    }
    return ret;
}
exports.assertSameCID = assertSameCID;
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