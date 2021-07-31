"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._invalidInput = void 0;
const util_1 = require("./util");
function _invalidInput(input) {
    let type = typeof input;
    return !(0, util_1._isStringObject)(type) && type !== 'function' && type !== 'object' || !Boolean(input);
}
exports._invalidInput = _invalidInput;
//# sourceMappingURL=_invalidInput.js.map