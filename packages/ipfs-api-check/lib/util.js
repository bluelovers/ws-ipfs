"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSubCheck = void 0;
/**
 * Created by user on 2020/3/21.
 */
const bluebird_1 = __importDefault(require("bluebird"));
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