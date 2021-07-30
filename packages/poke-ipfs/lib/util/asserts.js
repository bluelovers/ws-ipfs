"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPokeResultWithValue = void 0;
function isPokeResultWithValue(pokeResult) {
    var _a;
    return !pokeResult.error && pokeResult.value !== false && ((_a = pokeResult.value) === null || _a === void 0 ? void 0 : _a.length) > 0;
}
exports.isPokeResultWithValue = isPokeResultWithValue;
//# sourceMappingURL=asserts.js.map