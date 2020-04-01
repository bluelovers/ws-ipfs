"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsEnv = void 0;
let process = void 0;
function ipfsEnv(env) {
    var _a;
    env = (_a = env !== null && env !== void 0 ? env : (typeof process !== 'undefined' && (process === null || process === void 0 ? void 0 : process.env))) !== null && _a !== void 0 ? _a : {};
    return Object.entries(env)
        .reduce((a, [k, v]) => {
        if (k.startsWith('IPFS_')) {
            a[k] = v;
        }
        return a;
    }, {});
}
exports.ipfsEnv = ipfsEnv;
exports.default = ipfsEnv;
//# sourceMappingURL=index.js.map