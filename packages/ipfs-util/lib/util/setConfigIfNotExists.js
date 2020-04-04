"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfigIfNotExists = exports.setConfigIfNotExistsLazy = void 0;
async function setConfigIfNotExistsLazy(ipfs, entries) {
    const ls = [];
    for (const [key, value, options] of entries) {
        const bool = await setConfigIfNotExists(ipfs, key, value, options);
        ls.push(bool);
    }
    return ls;
}
exports.setConfigIfNotExistsLazy = setConfigIfNotExistsLazy;
async function setConfigIfNotExists(ipfs, key, value, options) {
    var _a;
    let v;
    let bool;
    try {
        v = await ipfs.config.get(key);
        bool = false;
    }
    catch (e) {
    }
    finally {
        try {
            if (v === null || typeof v === 'undefined' || await ((_a = options === null || options === void 0 ? void 0 : options.filter) === null || _a === void 0 ? void 0 : _a.call(options, v, key, ipfs))) {
                if (typeof value === 'function') {
                    value = await value(v, key, ipfs);
                }
                await ipfs.config.set(key, value);
                bool = true;
            }
        }
        catch (e) {
        }
    }
    return bool;
}
exports.setConfigIfNotExists = setConfigIfNotExists;
exports.default = setConfigIfNotExistsLazy;
//# sourceMappingURL=setConfigIfNotExists.js.map