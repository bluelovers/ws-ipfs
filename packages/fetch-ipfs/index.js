"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIPFSCore = exports.fetchIPFS = void 0;
const tslib_1 = require("tslib");
const cross_fetch_1 = (0, tslib_1.__importDefault)(require("cross-fetch"));
//import { Buffer } from "buffer";
const ipfs_1 = (0, tslib_1.__importDefault)(require("./ipfs"));
const bluebird_1 = (0, tslib_1.__importStar)(require("bluebird"));
const is_error_code_1 = (0, tslib_1.__importDefault)(require("is-error-code"));
const util_1 = require("./util");
async function fetchIPFS(cid, useIPFS, timeout, options = {}) {
    cid = (0, util_1.handleCID)(cid, useIPFS, options);
    return fetchIPFSCore(cid, useIPFS, timeout);
}
exports.fetchIPFS = fetchIPFS;
async function fetchIPFSCore(cidLink, useIPFS, timeout, options = {}) {
    timeout = (0, util_1.handleTimeout)(timeout);
    if (useIPFS) {
        return (0, ipfs_1.default)(cidLink, useIPFS, timeout);
    }
    const { controller, timer } = (0, util_1.newAbortController)(timeout);
    return bluebird_1.default.resolve((0, cross_fetch_1.default)(cidLink, {
        redirect: 'follow',
        // @ts-ignore
        timeout,
        signal: controller.signal,
    }))
        .timeout(timeout)
        .tapCatch(bluebird_1.TimeoutError, () => controller.abort())
        .finally(() => controller.clear())
        .tap(v => {
        if ((0, is_error_code_1.default)(v.status)) {
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