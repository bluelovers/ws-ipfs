"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeRepoConfigSync = exports.writeRepoConfig = exports.readRepoConfigSync = exports.readRepoConfig = exports._writeRepoConfigFileSync = exports._writeRepoConfigFile = exports._readRepoConfigFileSync = exports._readRepoConfigFile = exports.existsRepoConfigSync = exports.existsRepoConfig = exports.getRepoConfigPath = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
function getRepoConfigPath(repoPath) {
    return (0, path_1.join)(repoPath, 'config');
}
exports.getRepoConfigPath = getRepoConfigPath;
function existsRepoConfig(repoPath) {
    return (0, fs_extra_1.pathExists)(getRepoConfigPath(repoPath));
}
exports.existsRepoConfig = existsRepoConfig;
function existsRepoConfigSync(repoPath) {
    return (0, fs_extra_1.pathExistsSync)(getRepoConfigPath(repoPath));
}
exports.existsRepoConfigSync = existsRepoConfigSync;
function _readRepoConfigFile(file) {
    return (0, fs_extra_1.readJSON)(file);
}
exports._readRepoConfigFile = _readRepoConfigFile;
function _readRepoConfigFileSync(file) {
    return (0, fs_extra_1.readJSONSync)(file);
}
exports._readRepoConfigFileSync = _readRepoConfigFileSync;
function _writeRepoConfigFile(file, config) {
    return (0, fs_extra_1.writeJSON)(file, config, {
        spaces: 2,
    });
}
exports._writeRepoConfigFile = _writeRepoConfigFile;
function _writeRepoConfigFileSync(file, config) {
    return (0, fs_extra_1.writeJSONSync)(file, config, {
        spaces: 2,
    });
}
exports._writeRepoConfigFileSync = _writeRepoConfigFileSync;
function readRepoConfig(repoPath) {
    return _readRepoConfigFile(getRepoConfigPath(repoPath));
}
exports.readRepoConfig = readRepoConfig;
function readRepoConfigSync(repoPath) {
    return _readRepoConfigFileSync(getRepoConfigPath(repoPath));
}
exports.readRepoConfigSync = readRepoConfigSync;
function writeRepoConfig(repoPath, config) {
    return _writeRepoConfigFile(getRepoConfigPath(repoPath), config);
}
exports.writeRepoConfig = writeRepoConfig;
function writeRepoConfigSync(repoPath, config) {
    return _writeRepoConfigFileSync(getRepoConfigPath(repoPath), config);
}
exports.writeRepoConfigSync = writeRepoConfigSync;
//# sourceMappingURL=index.js.map