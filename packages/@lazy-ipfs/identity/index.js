"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIdentityToRepoConfigSync = exports.setIdentityToRepoConfig = exports.readIdentityFromRepoConfigSync = exports.readIdentityFromRepoConfig = exports.writeIdentityFileSync = exports.writeIdentityFile = exports.readIdentityFileSync = exports.readIdentityFile = exports.setIdentityToConfig = exports.getIdentityFromConfig = exports.getIdentityPath = exports.recommendIdentityFilename = void 0;
const fs_extra_1 = require("fs-extra");
const index_1 = require("@lazy-ipfs/repo-config/index");
const path_1 = require("path");
function recommendIdentityFilename() {
    return '.identity.json';
}
exports.recommendIdentityFilename = recommendIdentityFilename;
function getIdentityPath(targetPath) {
    return (0, path_1.join)(targetPath, recommendIdentityFilename());
}
exports.getIdentityPath = getIdentityPath;
function getIdentityFromConfig(config) {
    return config.Identity;
}
exports.getIdentityFromConfig = getIdentityFromConfig;
function setIdentityToConfig(config, Identity) {
    // @ts-ignore
    config.Identity = Identity;
    return config;
}
exports.setIdentityToConfig = setIdentityToConfig;
function readIdentityFile(file) {
    return (0, fs_extra_1.readJSON)(file);
}
exports.readIdentityFile = readIdentityFile;
function readIdentityFileSync(file) {
    return (0, fs_extra_1.readJSONSync)(file);
}
exports.readIdentityFileSync = readIdentityFileSync;
function writeIdentityFile(file, Identity) {
    return (0, fs_extra_1.writeJSON)(file, Identity, {
        spaces: 2,
    });
}
exports.writeIdentityFile = writeIdentityFile;
function writeIdentityFileSync(file, Identity) {
    return (0, fs_extra_1.writeJSONSync)(file, Identity, {
        spaces: 2,
    });
}
exports.writeIdentityFileSync = writeIdentityFileSync;
function readIdentityFromRepoConfig(repoPath) {
    return (0, index_1.readRepoConfig)(repoPath).then(getIdentityFromConfig);
}
exports.readIdentityFromRepoConfig = readIdentityFromRepoConfig;
function readIdentityFromRepoConfigSync(repoPath) {
    const config = (0, index_1.readRepoConfigSync)(repoPath);
    return getIdentityFromConfig(config);
}
exports.readIdentityFromRepoConfigSync = readIdentityFromRepoConfigSync;
function setIdentityToRepoConfig(repoPath, Identity) {
    return (0, index_1.readRepoConfig)(repoPath)
        .then(config => {
        config = setIdentityToConfig(config, Identity);
        return (0, index_1.writeRepoConfig)(repoPath, config);
    });
}
exports.setIdentityToRepoConfig = setIdentityToRepoConfig;
function setIdentityToRepoConfigSync(repoPath, Identity) {
    let config = (0, index_1.readRepoConfigSync)(repoPath);
    config = setIdentityToConfig(config, Identity);
    return (0, index_1.writeRepoConfigSync)(repoPath, config);
}
exports.setIdentityToRepoConfigSync = setIdentityToRepoConfigSync;
//# sourceMappingURL=index.js.map