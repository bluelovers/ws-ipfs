"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configApiCors = exports._setIfNotExists = void 0;
async function _setIfNotExists(ipfs, key, value) {
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
exports._setIfNotExists = _setIfNotExists;
async function configApiCors(ipfs) {
    let ls = [];
    let bool;
    bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Origin', ["*"]);
    ls.push(bool);
    bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Methods', ["GET", "POST"]);
    ls.push(bool);
    bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Headers', ["Authorization"]);
    ls.push(bool);
    bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Expose-Headers', ["Location"]);
    ls.push(bool);
    bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Credentials', ["true"]);
    ls.push(bool);
    return ls;
}
exports.configApiCors = configApiCors;
exports.default = configApiCors;
//# sourceMappingURL=cors.js.map