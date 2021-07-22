"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsFilesCopy = void 0;
const path_1 = require("path");
/**
 * @see https://github.com/ipfs/js-ipfs/issues/3747
 */
async function ipfsFilesCopy(ipfs, from, to, options) {
    if (options === null || options === void 0 ? void 0 : options.parents) {
        const dir_path = path_1.posix.dirname(to);
        if (dir_path.length && dir_path !== '/') {
            await ipfs.files.mkdir(dir_path, options).catch(e => null);
        }
    }
    return ipfs.files.cp(from, to, options);
}
exports.ipfsFilesCopy = ipfsFilesCopy;
//# sourceMappingURL=index.js.map