"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreIdentityFromPathSync = exports.restoreIdentityFromPath = exports.restoreIdentityFromFileSync = exports.restoreIdentityFromFile = exports.backupIdentityFromRepoToPathSync = exports.backupIdentityFromRepoToPath = exports.backupIdentityFromRepoToFileSync = exports.backupIdentityFromRepoToFile = exports.setIdentityToRepoConfigSync = exports.setIdentityToRepoConfig = exports.readIdentityFromRepoConfigSync = exports.readIdentityFromRepoConfig = exports.writeIdentityFileSync = exports.writeIdentityFile = exports.readIdentityFileSync = exports.readIdentityFile = exports.setIdentityToConfig = exports.assertIdentity = exports.getIdentityFromConfig = exports.existsIdentityPathSync = exports.existsIdentityPath = exports.getIdentityPath = exports.recommendIdentityFilename = void 0;
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
function existsIdentityPath(targetPath) {
    return (0, fs_extra_1.pathExists)(getIdentityPath(targetPath));
}
exports.existsIdentityPath = existsIdentityPath;
function existsIdentityPathSync(targetPath) {
    return (0, fs_extra_1.pathExistsSync)(getIdentityPath(targetPath));
}
exports.existsIdentityPathSync = existsIdentityPathSync;
function getIdentityFromConfig(config) {
    return config.Identity;
}
exports.getIdentityFromConfig = getIdentityFromConfig;
function assertIdentity(Identity) {
    var _a, _b;
    if (!((_a = Identity === null || Identity === void 0 ? void 0 : Identity.PeerID) === null || _a === void 0 ? void 0 : _a.length) || !((_b = Identity === null || Identity === void 0 ? void 0 : Identity.PrivKey) === null || _b === void 0 ? void 0 : _b.length)) {
        throw new TypeError(`Identity should include PeerID, PrivKey`);
    }
}
exports.assertIdentity = assertIdentity;
function setIdentityToConfig(config, Identity) {
    assertIdentity(Identity);
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
async function setIdentityToRepoConfig(repoPath, Identity) {
    assertIdentity(Identity);
    return (0, index_1.readRepoConfig)(repoPath)
        .then(config => {
        config = setIdentityToConfig(config, Identity);
        return (0, index_1.writeRepoConfig)(repoPath, config);
    });
}
exports.setIdentityToRepoConfig = setIdentityToRepoConfig;
function setIdentityToRepoConfigSync(repoPath, Identity) {
    assertIdentity(Identity);
    let config = (0, index_1.readRepoConfigSync)(repoPath);
    config = setIdentityToConfig(config, Identity);
    return (0, index_1.writeRepoConfigSync)(repoPath, config);
}
exports.setIdentityToRepoConfigSync = setIdentityToRepoConfigSync;
/**
 * file path of .identity.json
 */
function backupIdentityFromRepoToFile(repoPath, file) {
    return readIdentityFromRepoConfig(repoPath).then(Identity => writeIdentityFile(file, Identity));
}
exports.backupIdentityFromRepoToFile = backupIdentityFromRepoToFile;
/**
 * file path of .identity.json
 */
function backupIdentityFromRepoToFileSync(repoPath, file) {
    let Identity = readIdentityFromRepoConfigSync(repoPath);
    return writeIdentityFileSync(file, Identity);
}
exports.backupIdentityFromRepoToFileSync = backupIdentityFromRepoToFileSync;
/**
 * targetPath for save .identity.json
 */
function backupIdentityFromRepoToPath(repoPath, targetPath) {
    return backupIdentityFromRepoToFile(repoPath, getIdentityPath(targetPath));
}
exports.backupIdentityFromRepoToPath = backupIdentityFromRepoToPath;
/**
 * targetPath for save .identity.json
 */
function backupIdentityFromRepoToPathSync(repoPath, targetPath) {
    return backupIdentityFromRepoToFileSync(repoPath, getIdentityPath(targetPath));
}
exports.backupIdentityFromRepoToPathSync = backupIdentityFromRepoToPathSync;
function restoreIdentityFromFile(repoPath, file) {
    return readIdentityFile(file)
        .then(Identity => {
        return setIdentityToRepoConfig(repoPath, Identity);
    });
}
exports.restoreIdentityFromFile = restoreIdentityFromFile;
function restoreIdentityFromFileSync(repoPath, file) {
    const Identity = readIdentityFileSync(file);
    return setIdentityToRepoConfigSync(repoPath, Identity);
}
exports.restoreIdentityFromFileSync = restoreIdentityFromFileSync;
function restoreIdentityFromPath(repoPath, targetPath) {
    return restoreIdentityFromFile(repoPath, getIdentityPath(targetPath));
}
exports.restoreIdentityFromPath = restoreIdentityFromPath;
function restoreIdentityFromPathSync(repoPath, targetPath) {
    return restoreIdentityFromFileSync(repoPath, getIdentityPath(targetPath));
}
exports.restoreIdentityFromPathSync = restoreIdentityFromPathSync;
//# sourceMappingURL=index.js.map