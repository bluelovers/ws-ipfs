"use strict";
/**
 * Created by user on 2020/3/21.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBufferMaybe = exports.runSubCheck = void 0;
async function runSubCheck(fn) {
    let error;
    const startTime = Date.now();
    const success = await Promise.resolve()
        .then(fn)
        .then(success => !!success)
        .catch(e => {
        error = e;
    });
    return {
        success,
        spendTime: Date.now() - startTime,
        error,
    };
}
exports.runSubCheck = runSubCheck;
function isBufferMaybe(buf) {
    return (buf === null || buf === void 0 ? void 0 : buf.length) && typeof (buf === null || buf === void 0 ? void 0 : buf[0]) === 'number';
}
exports.isBufferMaybe = isBufferMaybe;
//# sourceMappingURL=util.js.map