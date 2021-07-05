"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSubCheck = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2020/3/21.
 */
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
async function runSubCheck(fn) {
    let error;
    const startTime = Date.now();
    const success = await bluebird_1.default.resolve()
        .then(fn)
        .timeout(10 * 1000)
        .catch(e => {
        error = e;
    })
        .then(success => !!success);
    return {
        success,
        spendTime: Date.now() - startTime,
        error,
    };
}
exports.runSubCheck = runSubCheck;
//# sourceMappingURL=util.js.map