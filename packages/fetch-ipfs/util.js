"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyRaceServerList = exports.handleTimeout = exports.handleCID = exports.newAbortController = void 0;
const abort_controller_1 = __importDefault(require("abort-controller"));
const to_ipfs_url_1 = require("to-ipfs-url");
const ipfs_server_list_1 = require("ipfs-server-list");
function newAbortController(timeout) {
    const controller = new abort_controller_1.default();
    const timer = setTimeout(() => controller.abort(), timeout);
    return {
        controller,
        timer,
    };
}
exports.newAbortController = newAbortController;
function handleCID(cid, useIPFS, options = {}) {
    if (useIPFS) {
        try {
            cid = new URL(cid).pathname;
        }
        catch (e) {
            if (!to_ipfs_url_1.isCidOrPath(cid)) {
                cid = to_ipfs_url_1.toPath(cid, options);
            }
        }
    }
    else {
        try {
            cid = new URL(cid).href;
        }
        catch (e) {
            cid = to_ipfs_url_1.toLink(cid, options);
        }
    }
    return cid;
}
exports.handleCID = handleCID;
function handleTimeout(timeout) {
    return timeout |= 0 > 0 ? timeout : 60 * 1000;
}
exports.handleTimeout = handleTimeout;
function lazyRaceServerList() {
    return ipfs_server_list_1.filterList('API');
}
exports.lazyRaceServerList = lazyRaceServerList;
//# sourceMappingURL=util.js.map