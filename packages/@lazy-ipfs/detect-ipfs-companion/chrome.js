"use strict";
///<reference types="chrome"/>
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectIpfsCompanion = exports.detectIpfsCompanionSync = void 0;
/**
 * @see https://github.com/ipfs-shipyard/ipfs-redux-bundle/blob/master/src/companion/index.js
 */
function detectIpfsCompanionSync(opts) {
    var _a, _b, _c, _d, _e, _f;
    const win = (_a = opts === null || opts === void 0 ? void 0 : opts.window) !== null && _a !== void 0 ? _a : ((typeof window !== 'undefined') && window);
    try {
        const ipfs = (_f = (_e = (_d = (_c = (_b = win === null || win === void 0 ? void 0 : win.chrome) === null || _b === void 0 ? void 0 : _b.extension) === null || _c === void 0 ? void 0 : _c.getBackgroundPage) === null || _d === void 0 ? void 0 : _d.call(_c)) === null || _e === void 0 ? void 0 : _e.ipfsCompanion) === null || _f === void 0 ? void 0 : _f.ipfs;
        if (ipfs === null || ipfs === void 0) {
            return;
        }
        return {
            ipfs,
            provider: 'ipfs-companion'
        };
    }
    catch (err) {
    }
}
exports.detectIpfsCompanionSync = detectIpfsCompanionSync;
async function detectIpfsCompanion(opts) {
    return detectIpfsCompanionSync(opts);
}
exports.detectIpfsCompanion = detectIpfsCompanion;
exports.default = detectIpfsCompanion;
//# sourceMappingURL=chrome.js.map