"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkIPFSApiAsync = exports.unlinkIPFSApi = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
function unlinkIPFSApi(ipfsPath) {
    const api = (0, path_1.join)(ipfsPath, 'api');
    let stat;
    try {
        stat = (0, fs_1.statSync)(api, {
            throwIfNoEntry: false
        });
    }
    catch (e) {
    }
    if (stat) {
        if (!stat.isFile()) {
            throw new Error(`target path not a file, ${api}`);
        }
        (0, fs_1.unlinkSync)(api);
    }
}
exports.unlinkIPFSApi = unlinkIPFSApi;
async function unlinkIPFSApiAsync(ipfsPath) {
    const api = (0, path_1.join)(ipfsPath, 'api');
    return (0, promises_1.stat)(api, {
        throwIfNoEntry: false
    })
        .then(stat => {
        if (stat) {
            if (!stat.isFile()) {
                throw new Error(`target path not a file, ${api}`);
            }
            return (0, promises_1.unlink)(api);
        }
    });
}
exports.unlinkIPFSApiAsync = unlinkIPFSApiAsync;
//# sourceMappingURL=unlinkIPFSApi.js.map