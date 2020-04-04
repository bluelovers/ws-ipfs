"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectIpfsWindow = exports.detectIpfsWindowSync = void 0;
function detectIpfsWindowSync(opts) {
    var _a, _b;
    try {
        const ipfs = (_b = ((_a = opts === null || opts === void 0 ? void 0 : opts.window) !== null && _a !== void 0 ? _a : ((typeof window !== 'undefined') && window))) === null || _b === void 0 ? void 0 : _b.ipfs;
        if (ipfs === null || ipfs === void 0) {
            return;
        }
        return {
            ipfs,
            provider: 'window.ipfs'
        };
    }
    catch (err) {
    }
}
exports.detectIpfsWindowSync = detectIpfsWindowSync;
async function detectIpfsWindow(opts) {
    return detectIpfsWindowSync(opts);
}
exports.detectIpfsWindow = detectIpfsWindow;
exports.default = detectIpfsWindow;
//# sourceMappingURL=window.js.map