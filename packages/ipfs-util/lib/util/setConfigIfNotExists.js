"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfigIfNotExists = exports.setConfigIfNotExistsLazy = void 0;
async function setConfigIfNotExistsLazy(ipfs, entries) {
    const ls = [];
    for (const [key, value] of entries) {
        const bool = await setConfigIfNotExists(ipfs, key, value);
        ls.push(bool);
    }
    return ls;
}
exports.setConfigIfNotExistsLazy = setConfigIfNotExistsLazy;
async function setConfigIfNotExists(ipfs, key, value) {
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
            if (v == null) {
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