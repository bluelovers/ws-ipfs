"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokeAllSettledResultWithHref = exports.filterPokeAllSettledResultWithValue = void 0;
const asserts_1 = require("./asserts");
function filterPokeAllSettledResultWithValue(settledResults) {
    return settledResults.filter(v => (0, asserts_1.isPokeResultWithValue)(v.value));
}
exports.filterPokeAllSettledResultWithValue = filterPokeAllSettledResultWithValue;
function getPokeAllSettledResultWithHref(settledResults) {
    return filterPokeAllSettledResultWithValue(settledResults).map(value => value.value.href).filter(Boolean);
}
exports.getPokeAllSettledResultWithHref = getPokeAllSettledResultWithHref;
//# sourceMappingURL=filterPokeAllSettledResult.js.map