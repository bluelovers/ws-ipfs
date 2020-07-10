"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkIPFSApi = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function unlinkIPFSApi(ipfsPath) {
    let api = path_1.join(ipfsPath, 'api');
    let stat = fs_1.statSync(api);
    if (!stat.isFile()) {
        throw new Error(`target path not a file, ${api}`);
    }
    fs_1.unlinkSync(api);
}
exports.unlinkIPFSApi = unlinkIPFSApi;
//# sourceMappingURL=unlinkIPFSApi.js.map