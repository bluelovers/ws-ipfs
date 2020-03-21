"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIPFSCore = exports.fetchIPFS = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const to_ipfs_url_1 = require("to-ipfs-url");
const buffer_1 = require("buffer");
const abort_controller_1 = __importDefault(require("abort-controller"));
const ipfs_1 = __importDefault(require("./ipfs"));
const bluebird_1 = __importDefault(require("bluebird"));
const is_error_code_1 = __importDefault(require("is-error-code"));
async function fetchIPFS(cid, useIPFS, timeout) {
    if (useIPFS != null) {
        try {
            cid = new URL(cid).pathname;
        }
        catch (e) {
            if (!to_ipfs_url_1.isCidOrPath(cid)) {
                cid = to_ipfs_url_1.toPath(cid);
            }
        }
        return fetchIPFSCore(cid, useIPFS, timeout);
    }
    try {
        cid = new URL(cid).href;
    }
    catch (e) {
        cid = to_ipfs_url_1.toLink(cid);
    }
    return fetchIPFSCore(cid, useIPFS, timeout);
}
exports.fetchIPFS = fetchIPFS;
async function fetchIPFSCore(cid, useIPFS, timeout) {
    timeout = timeout |= 0 || 60 * 1000;
    if (useIPFS != null) {
        return ipfs_1.default(cid, useIPFS, timeout);
    }
    const controller = new abort_controller_1.default();
    const timer = setTimeout(() => controller.abort(), timeout);
    return bluebird_1.default.resolve(cross_fetch_1.default(cid, {
        redirect: 'follow',
        // @ts-ignore
        timeout,
        signal: controller.signal,
    }))
        .finally(() => clearTimeout(timer))
        .tap(v => {
        if (is_error_code_1.default(v.status)) {
            let e = new Error(v.statusText);
            // @ts-ignore
            e.res = v;
            return Promise.reject(e);
        }
    })
        .then(v => v.arrayBuffer())
        .then(buf => buffer_1.Buffer.from(buf));
}
exports.fetchIPFSCore = fetchIPFSCore;
exports.default = fetchIPFS;
//# sourceMappingURL=index.js.map