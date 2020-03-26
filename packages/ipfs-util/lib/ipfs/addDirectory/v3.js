"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDirectoryToIPFS = void 0;
const glob_source_1 = __importDefault(require("ipfs-utils/src/files/glob-source"));
const get_stream_1 = __importDefault(require("get-stream"));
const list_1 = require("../mfs/list");
const logger_1 = __importDefault(require("debug-color2/logger"));
async function addDirectoryToIPFS(ipfs, targetDirPath, { options, globSourceOptions, ignoreExists, } = {}) {
    const stream = glob_source_1.default(targetDirPath, {
        recursive: true,
        ...globSourceOptions,
    });
    let i = 0;
    let cid;
    ignoreExists = !!ignoreExists;
    for await (const entry of stream) {
        if (entry.content) {
            if (ignoreExists === true && await list_1.ipfsFilesExists(ipfs, entry.path)) {
                logger_1.default.gray.debug(entry.path);
                continue;
            }
            logger_1.default.debug(entry.path);
            let buf = await get_stream_1.default.buffer(entry.content);
            await ipfs.files.write(entry.path, buf, {
                create: true,
                parents: true,
                mode: entry.mode,
                mtime: entry.mtime,
            });
            i++;
            if ((i % 100) === 0) {
                const cid = await ipfs.files.flush();
                logger_1.default.debug(cid.toString());
            }
        }
        else {
            logger_1.default.debug(entry.path);
        }
    }
    cid = await ipfs.files.flush();
    return {
        targetDirPath,
        root: {
            cid,
        },
        files: {
            length: i,
        },
    };
}
exports.addDirectoryToIPFS = addDirectoryToIPFS;
exports.default = addDirectoryToIPFS;
//# sourceMappingURL=v3.js.map