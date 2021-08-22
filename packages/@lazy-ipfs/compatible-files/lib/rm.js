"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsFilesRemove = void 0;
const _promise_1 = require("./util/_promise");
const _getExtraOptions_1 = require("./util/_getExtraOptions");
async function ipfsFilesRemove(ipfs, path, options) {
    let p = ipfs.files.rm(path, options);
    let extraOptions = (0, _getExtraOptions_1._getExtraOptions)(options);
    return (0, _promise_1._ignoreError)(p, extraOptions);
}
exports.ipfsFilesRemove = ipfsFilesRemove;
//# sourceMappingURL=rm.js.map