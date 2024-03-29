"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDirectoryToIPFS = void 0;
const tslib_1 = require("tslib");
const glob_source_1 = tslib_1.__importDefault(require("ipfs-utils/src/files/glob-source"));
const get_stream_1 = tslib_1.__importDefault(require("get-stream"));
const list_1 = require("../mfs/list");
const logger_1 = tslib_1.__importDefault(require("debug-color2/logger"));
async function addDirectoryToIPFS(ipfs, targetDirPath, { options, globSourceOptions, ignoreExists, } = {}) {
    const stream = (0, glob_source_1.default)(targetDirPath, {
        recursive: true,
        ...globSourceOptions,
    });
    let i = 0;
    let cid;
    ignoreExists = !!ignoreExists;
    for await (const entry of stream) {
        // @ts-ignore
        if (entry.content) {
            if (ignoreExists === true && await (0, list_1.ipfsFilesExists)(ipfs, entry.path)) {
                logger_1.default.gray.debug(entry.path);
                continue;
            }
            logger_1.default.debug(entry.path);
            // @ts-ignore
            let buf = await get_stream_1.default.buffer(entry.content);
            await ipfs.files.write(entry.path, buf, {
                create: true,
                parents: true,
                mode: entry.mode,
                mtime: entry.mtime,
            });
            i++;
            if ((i % 100) === 0) {
                const cid = await ipfs.files.flush(entry.path);
                logger_1.default.debug(cid.toString());
            }
        }
        else {
            logger_1.default.debug(entry.path);
        }
    }
    // @ts-ignore
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