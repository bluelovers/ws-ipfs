"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDirectoryToIPFS = void 0;
const glob_source_1 = __importDefault(require("ipfs-utils/src/files/glob-source"));
const compatible_add_1 = __importDefault(require("@lazy-ipfs/compatible-add"));
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