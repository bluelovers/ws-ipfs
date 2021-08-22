"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkIPFSApiAsync = exports.unlinkIPFSApi = exports._pathIpfsRunningApi = exports._assertIsFile = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const util_1 = require("util");
const fs_stat_1 = require("fs-stat");
function _assertIsFile(api, stat) {
    if (stat && !stat.isFile()) {
        throw new Error(`target path not a file, ${api}`);
    }
}
exports._assertIsFile = _assertIsFile;
function _pathIpfsRunningApi(ipfsPath) {
    return (0, path_1.join)(ipfsPath, 'api');
}
exports._pathIpfsRunningApi = _pathIpfsRunningApi;
function unlinkIPFSApi(ipfsPath) {
    const api = _pathIpfsRunningApi(ipfsPath);
    let stat = (0, fs_stat_1.fsStatSync)(api, {
        throwIfNoEntry: false
    });
    if (stat) {
        _assertIsFile(api, stat);
        (0, fs_1.unlinkSync)(api);
    }
}
exports.unlinkIPFSApi = unlinkIPFSApi;
async function unlinkIPFSApiAsync(ipfsPath) {
    const api = _pathIpfsRunningApi(ipfsPath);
    return (0, fs_stat_1.fsStat)(api, {
        throwIfNoEntry: false
    })
        .then(stat => {
        if (stat) {
            _assertIsFile(api, stat);
            return (0, util_1.promisify)(fs_1.unlink)(api);
        }
    });
}
exports.unlinkIPFSApiAsync = unlinkIPFSApiAsync;
//# sourceMappingURL=unlinkIPFSApi.js.map