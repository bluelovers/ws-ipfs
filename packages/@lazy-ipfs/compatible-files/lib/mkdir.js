"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsFilesMakeDirectory = void 0;
const _getExtraOptions_1 = require("./util/_getExtraOptions");
const stat_1 = require("./stat");
const _promise_1 = require("./util/_promise");
function ipfsFilesMakeDirectory(ipfs, dir_path, options) {
    let p = ipfs.files.mkdir(dir_path, options);
    let extraOptions = (0, _getExtraOptions_1._getExtraOptions)(options);
    p = (0, _promise_1._ignoreError)(p, extraOptions);
    p = (0, stat_1._returnStat02)(p, ipfs, dir_path, extraOptions);
    return p;
}
exports.ipfsFilesMakeDirectory = ipfsFilesMakeDirectory;
//# sourceMappingURL=mkdir.js.map