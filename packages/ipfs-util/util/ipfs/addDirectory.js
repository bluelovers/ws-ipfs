"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDirectoryToIPFS = void 0;
const glob_source_1 = __importDefault(require("ipfs-utils/src/files/glob-source"));
async function addDirectoryToIPFS(ipfs, targetDirPath, { options, globSourceOptions, } = {}) {
    let files = [];
    for await (const file of ipfs.add(glob_source_1.default(targetDirPath, {
        recursive: true,
        ...globSourceOptions,
    }), options)) {
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
//# sourceMappingURL=addDirectory.js.map