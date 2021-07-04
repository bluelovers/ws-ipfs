"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIPFSCore = exports.fetchIPFS = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
//import { Buffer } from "buffer";
const ipfs_1 = __importDefault(require("./ipfs"));
const bluebird_1 = __importStar(require("bluebird"));
const is_error_code_1 = __importDefault(require("is-error-code"));
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