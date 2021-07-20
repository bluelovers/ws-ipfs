"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueOfSettledResult = void 0;
function valueOfSettledResult(settledResult) {
    var _a, _b;
    return (_a = settledResult.value) !== null && _a !== void 0 ? _a : (_b = settledResult.reason) === null || _b === void 0 ? void 0 : _b.value;
}
exports.valueOfSettledResult = valueOfSettledResult;
//# sourceMappingURL=valueOfSettledResult.js.map