"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._returnStat02 = exports._returnStat01 = exports.ipfsFilesStat = void 0;
const _getExtraOptions_1 = require("./util/_getExtraOptions");
const _promise_1 = require("./util/_promise");
function ipfsFilesStat(ipfs, path, options) {
    let p = ipfs.files.stat(path, options);
    let extraOptions = (0, _getExtraOptions_1._getExtraOptions)(options);
    return (0, _promise_1._ignoreError)(p, extraOptions);
}
exports.ipfsFilesStat = ipfsFilesStat;
function _returnStat01(ipfs, path, extraOptions) {
    let p = ipfsFilesStat(ipfs, path, extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.statOptions);
    return (0, _promise_1._ignoreError)(p, extraOptions);
}
exports._returnStat01 = _returnStat01;
function _returnStat02(p, ipfs, path, extraOptions) {
    if (extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.returnStat) {
        return p.then(() => _returnStat01(ipfs, path, extraOptions));
    }
    return p;
}
exports._returnStat02 = _returnStat02;
//# sourceMappingURL=stat.js.map