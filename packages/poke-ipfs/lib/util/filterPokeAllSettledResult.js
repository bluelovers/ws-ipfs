"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPokeAllSettledResultWithValue = void 0;
const asserts_1 = require("./asserts");
function filterPokeAllSettledResultWithValue(settledResults) {
    return settledResults.filter(v => (0, asserts_1.isPokeResultWithValue)(v.value));
}
exports.filterPokeAllSettledResultWithValue = filterPokeAllSettledResultWithValue;
//# sourceMappingURL=filterPokeAllSettledResult.js.map