"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIPFSCore = exports.fetchIPFS = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
//import { Buffer } from "buffer";
const ipfs_1 = __importDefault(require("./ipfs"));
const bluebird_1 = __importDefault(require("bluebird"));
const is_error_code_1 = __importDefault(require("is-error-code"));
const util_1 = require("./util");
async function fetchIPFS(cid, useIPFS, timeout, options = {}) {
    cid = util_1.handleCID(cid, useIPFS, options);
    return fetchIPFSCore(cid, useIPFS, timeout);
}
exports.fetchIPFS = fetchIPFS;
async function fetchIPFSCore(cidLink, useIPFS, timeout, options = {}) {
    timeout = util_1.handleTimeout(timeout);
    if (useIPFS) {
        return ipfs_1.default(cidLink, useIPFS, timeout);
    }
    const { controller, timer } = util_1.newAbortController(timeout);
    return bluebird_1.default.resolve(cross_fetch_1.default(cidLink, {
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
        .then(buf => Buffer.from(buf));
}
exports.fetchIPFSCore = fetchIPFSCore;
exports.default = fetchIPFS;
//# sourceMappingURL=index.js.map