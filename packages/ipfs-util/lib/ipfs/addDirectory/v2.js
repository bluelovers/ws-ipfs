"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDirectoryToIPFS = void 0;
const tslib_1 = require("tslib");
const glob_source_1 = tslib_1.__importDefault(require("ipfs-utils/src/files/glob-source"));
const compatible_add_1 = tslib_1.__importDefault(require("@lazy-ipfs/compatible-add"));
async function addDirectoryToIPFS(ipfs, targetDirPath, { options, globSourceOptions, } = {}) {
    const stream = (0, glob_source_1.default)(targetDirPath, {
        recursive: true,
        ...globSourceOptions,
    });
    let files = [];
    let root;
    let i = 0;
    // @ts-ignore
    for await (const file of (0, compatible_add_1.default)(ipfs, stream, options)) {
        if ((i++ % 100) === 0) {
            console.dir(file.path);
            console.log(file.cid.toString());
            //console.dir(root = file)
        }
        root = file;
    }
    return {
        targetDirPath,
        root,
        files: {
            length: i,
        },
    };
}
exports.addDirectoryToIPFS = addDirectoryToIPFS;
exports.default = addDirectoryToIPFS;
//# sourceMappingURL=v2.js.map