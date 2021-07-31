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
    return fetchIPFSCore(cid, useIPFS, timeout, options);
}
exports.fetchIPFS = fetchIPFS;
async function fetchIPFSCore(cidLink, useIPFS, timeout, options = {}) {
    var _a, _b;
    timeout = (0, util_1.handleTimeout)(timeout);
    if (useIPFS) {
        return (0, ipfs_1.default)(cidLink, useIPFS, timeout, options);
    }
    options !== null && options !== void 0 ? options : (options = {});
    let fetchOptions = {
        ...options === null || options === void 0 ? void 0 : options.fetchOptions,
        redirect: 'follow',
    };
    (_a = fetchOptions.timeout) !== null && _a !== void 0 ? _a : (fetchOptions.timeout = options.timeout);
    (_b = fetchOptions.signal) !== null && _b !== void 0 ? _b : (fetchOptions.signal = options.signal);
    let controller;
    if (timeout && !fetchOptions.signal) {
        controller = (0, util_1.newAbortController)(timeout).controller;
        fetchOptions.signal = controller.signal;
    }
    return bluebird_1.default.resolve((0, cross_fetch_1.default)(cidLink.toString(), fetchOptions))
        .timeout(timeout)
        .tapCatch(bluebird_1.TimeoutError, () => controller.abort())
        .tap(v => {
        if ((0, is_error_code_1.default)(v.status)) {
            let e = new Error(v.statusText);
            // @ts-ignore
            e.res = v;
            return Promise.reject(e);
        }
    })
        .then(v => v.arrayBuffer())
        .then(buf => Buffer.from(buf))
        .finally(() => controller === null || controller === void 0 ? void 0 : controller.abort());
}
exports.fetchIPFSCore = fetchIPFSCore;
exports.default = fetchIPFS;
//# sourceMappingURL=index.js.map