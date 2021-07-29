"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyRaceServerList = exports.handleTimeout = exports.handleCID = exports.newAbortController = void 0;
const to_ipfs_url_1 = require("to-ipfs-url");
const ipfs_server_list_1 = require("ipfs-server-list");
const abort_controller_timer_1 = require("abort-controller-timer");
function newAbortController(timeout) {
    const controller = new abort_controller_timer_1.AbortControllerTimer(timeout);
    return {
        controller,
        timer: controller.timer,
    };
}
exports.newAbortController = newAbortController;
function handleCID(cid, useIPFS, options = {}) {
    if (useIPFS) {
        try {
            // @ts-ignore
            cid = new URL(cid).pathname;
        }
        catch (e) {
            if (!(0, to_ipfs_url_1.isCidOrPath)(cid)) {
                cid = (0, to_ipfs_url_1.toPath)(cid, options);
            }
        }
    }
    else {
        try {
            // @ts-ignore
            cid = new URL(cid).href;
        }
        catch (e) {
            cid = (0, to_ipfs_url_1.toLink)(cid, options);
        }
    }
    return cid;
}
exports.handleCID = handleCID;
function handleTimeout(timeout) {
    if (timeout === 0) {
        return void 0;
    }
    return timeout |= 0 > 0 ? timeout : 60 * 1000;
}
exports.handleTimeout = handleTimeout;
function lazyRaceServerList() {
    return (0, ipfs_server_list_1.filterList)('API');
}
exports.lazyRaceServerList = lazyRaceServerList;
//# sourceMappingURL=util.js.map