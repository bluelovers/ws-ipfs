"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFilesList = exports.ipfsFilesExists = exports.deepFilesListCore = exports.isNull = exports.fixMarkDirectories = exports.fixPath = exports.fixDirPath = exports.mfsFileType = void 0;
const tslib_1 = require("tslib");
const micromatch_1 = (0, tslib_1.__importDefault)(require("micromatch"));
const path_1 = require("path");
function mfsFileType(type) {
    if (type === 0 /* FILE */ || type === "file" /* FILE */) {
        return 0 /* FILE */;
    }
    else if (type === 1 /* DIR */ || type === "directory" /* DIR */) {
        return 1 /* DIR */;
    }
    throw new TypeError(`unknown file type: ${type}, ${typeof type}`);
    return type;
}
exports.mfsFileType = mfsFileType;
function fixDirPath(dir) {
    return fixMarkDirectories(fixPath(dir));
}
exports.fixDirPath = fixDirPath;
function fixPath(dir) {
    dir = dir.replace(/\\/g, '/');
    return dir;
}
exports.fixPath = fixPath;
function fixMarkDirectories(dir) {
    if (!dir.endsWith('/')) {
        dir += '/';
    }
    return dir;
}
exports.fixMarkDirectories = fixMarkDirectories;
function isNull(value) {
    return typeof value === 'undefined' || value === null;
}
exports.isNull = isNull;
async function* deepFilesListCore(ipfs, rootPath, options = {}) {
    const { prefix = '', deep = 0, level = 0 } = options;
    for await (const file of ipfs.files.ls(rootPath)) {
        if (prefix !== '') {
            file.name = prefix + '/' + file.name;
        }
        // @ts-ignore
        yield file;
        // @ts-ignore
        if (file.type === 1 /* DIR */) {
            if (level >= deep) {
                continue;
            }
            yield* deepFilesListCore(ipfs, rootPath + file.name, {
                prefix: file.name,
                level: level + 1,
            });
        }
    }
}
exports.deepFilesListCore = deepFilesListCore;
async function ipfsFilesExists(ipfs, targetPath) {
    let cwd = path_1.posix.dirname(targetPath);
    let stat = await ipfs.files.stat(targetPath, {
        timeout: 1000,
    }).catch(e => null);
    if (stat) {
        if (mfsFileType(stat.type) === 0 /* FILE */) {
            return true;
        }
        //console.dir(stat)
        for await (const file of deepFilesList(ipfs, {
            cwd,
            onlyFiles: true,
            recursive: false,
            absolute: true,
        })) {
            //console.dir(file);
            if (mfsFileType(file.type) === 0 /* FILE */ && file.name === targetPath) {
                return true;
            }
        }
    }
    return false;
}
exports.ipfsFilesExists = ipfsFilesExists;
async function* deepFilesList(ipfs, options = {}) {
    const rootPath = fixDirPath((options === null || options === void 0 ? void 0 : options.cwd) || '/');
    let { globPattern, globOptions, filter, onlyFiles, absolute, markDirectories, deep, recursive } = options;
    if (options === null || options === void 0 ? void 0 : options.onlyDirectories) {
        if (onlyFiles) {
            throw new TypeError(`onlyDirectories, onlyFiles can't be set at same time`);
        }
        else {
            onlyFiles = false;
        }
    }
    else if (isNull(onlyFiles)) {
        onlyFiles = true;
    }
    onlyFiles = !!onlyFiles;
    absolute = !!absolute;
    const hasFilter = !isNull(filter);
    markDirectories = !!markDirectories;
    recursive = !!(recursive !== null && recursive !== void 0 ? recursive : (deep !== null && deep !== void 0 ? deep : true));
    if (!recursive) {
        deep = 0;
    }
    if (typeof deep !== 'number') {
        if (typeof deep === 'string') {
            deep = parseInt(deep);
        }
        else if (typeof deep === 'boolean' || isNull(deep)) {
            deep = recursive ? Infinity : 0;
        }
    }
    if (deep < 0) {
        deep = Infinity;
    }
    if ((globPattern === null || globPattern === void 0 ? void 0 : globPattern.length) === 0) {
        throw new TypeError(`globPattern.length should not 0`);
    }
    for await (const file of deepFilesListCore(ipfs, rootPath, {
        deep,
    })) {
        const isDir = file.type === 1 /* DIR */;
        if (onlyFiles === true && isDir) {
            continue;
        }
        const absPath = rootPath + file.name;
        if (globPattern && !micromatch_1.default.isMatch(absPath, globPattern, globOptions)) {
            continue;
        }
        if (absolute === true) {
            file.name = absPath;
        }
        if (markDirectories === true && isDir === true) {
            file.name = fixMarkDirectories(file.name);
        }
        if (hasFilter === true && !filter(file)) {
            continue;
        }
        yield file;
    }
}
exports.deepFilesList = deepFilesList;
exports.default = deepFilesList;
//# sourceMappingURL=list.js.map