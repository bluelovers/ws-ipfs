"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._promiseCatchAggregateError = void 0;
const lazy_aggregate_error_1 = require("lazy-aggregate-error");
function _promiseCatchAggregateError(p, err) {
    return p.catch(e => {
        if (e instanceof lazy_aggregate_error_1.AggregateErrorExtra) {
            err = e;
        }
        else {
            err !== null && err !== void 0 ? err : (err = new lazy_aggregate_error_1.AggregateErrorExtra());
            err.push(e);
        }
        return Promise.reject(err);
    });
}
exports._promiseCatchAggregateError = _promiseCatchAggregateError;
//# sourceMappingURL=_promiseCatchAggregateError.js.map