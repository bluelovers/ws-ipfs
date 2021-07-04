"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDirectoryToIPFS = void 0;
const list_1 = require("../mfs/list");
const logger_1 = __importDefault(require("debug-color2/logger"));
const fast_glob_1 = __importDefault(require("@bluelovers/fast-glob"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = require("fs-extra");
async function addDirectoryToIPFS(ipfs, targetDirPath, { options, globSourceOptions, ignoreExists, } = {}) {
    let i = 0;
    let cid;
    ignoreExists = !!ignoreExists;
    const rootPath = '/' + path_1.default.basename(targetDirPath) + '/';
    const files = [];
    for await (let filename of fast_glob_1.default.stream([
        '**/*',
        //'**/*.txt',
    ], {
        cwd: targetDirPath,
        onlyFiles: true,
        //deep: Infinity,
    })) {
        filename = filename.toString();
        //console.dir(filename)
        let entry = {
            path: rootPath + filename,
            // @ts-ignore
            //content: createReadStream(path.join(targetDirPath, filename)),
            mode: undefined,
            mtime: undefined,
        };
        if (ignoreExists === true && await (0, list_1.ipfsFilesExists)(ipfs, entry.path)) {
            logger_1.default.gray.debug(entry.path);
            continue;
        }
        logger_1.default.debug(entry.path);
        let buf = await (0, fs_extra_1.readFile)(path_1.default.join(targetDirPath, filename));
        await ipfs.files.write(entry.path, buf, {
            create: true,
            parents: true,
            mode: entry.mode,
            mtime: entry.mtime,
        });
        files.push({
            path: entry.path,
        });
        i++;
        if ((i % 100) === 0) {
            const cid = await ipfs.files.flush();
            logger_1.default.success(cid.toString());
        }
    }
    cid = await ipfs.files.flush();
    return {
        targetDirPath,
        root: {
            cid,
        },
        files,
    };
}
exports.addDirectoryToIPFS = addDirectoryToIPFS;
exports.default = addDirectoryToIPFS;
//# sourceMappingURL=v4.js.map