"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkIPFSApi = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function unlinkIPFSApi(ipfsPath) {
    const api = (0, path_1.join)(ipfsPath, 'api');
    let stat;
    try {
        stat = (0, fs_1.statSync)(api);
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
//# sourceMappingURL=unlinkIPFSApi.js.map