"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ignoreError = exports._promiseIgnoreError = void 0;
const _dummy_1 = require("./_dummy");
const _promiseCatchAggregateError_1 = require("./_promiseCatchAggregateError");
function _promiseIgnoreError(p, _dummy, err) {
    if (err) {
        p = (0, _promiseCatchAggregateError_1._promiseCatchAggregateError)(p, err);
    }
    return p.catch(_dummy !== null && _dummy !== void 0 ? _dummy : _dummy_1._dummyNull);
}
exports._promiseIgnoreError = _promiseIgnoreError;
function _ignoreError(p, extraOptions, _dummy) {
    if (extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.returnStat) {
        return _promiseIgnoreError(p, _dummy);
    }
    return p;
}
exports._ignoreError = _ignoreError;
//# sourceMappingURL=_promise.js.map