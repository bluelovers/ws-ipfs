"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDirectoryToIPFS = void 0;
const tslib_1 = require("tslib");
const glob_source_1 = tslib_1.__importDefault(require("ipfs-utils/src/files/glob-source"));
const compatible_add_1 = tslib_1.__importDefault(require("@lazy-ipfs/compatible-add"));
async function addDirectoryToIPFS(ipfs, targetDirPath, { options, globSourceOptions, } = {}) {
    let files = [];
    // @ts-ignore
    for await (const file of (0, compatible_add_1.default)(ipfs, (0, glob_source_1.default)(targetDirPath, {
        recursive: true,
        ...globSourceOptions,
    }), options)) {
        console.log(file);
        files.push(file);
    }
    const root = files[files.length - 1];
    return {
        targetDirPath,
        root,
        files,
    };
}
exports.addDirectoryToIPFS = addDirectoryToIPFS;
exports.default = addDirectoryToIPFS;
//# sourceMappingURL=v1.js.map