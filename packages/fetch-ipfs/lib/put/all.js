"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToIPFSAll = void 0;
const handleClientList_1 = require("../handleClientList");
const util_1 = require("../../util");
const compatible_add_1 = __importDefault(require("@lazy-ipfs/compatible-add"));
function publishToIPFSAll(data, useIPFS, options) {
    let { timeout, signal, addOptions } = options || {};
    timeout = util_1.handleTimeout(timeout);
    addOptions = {
        timeout,
        signal,
        ...addOptions,
    };
    return handleClientList_1.handleClientList(useIPFS, (ipfs => typeof (ipfs === null || ipfs === void 0 ? void 0 : ipfs.add) === 'function'))
        .reduce(async (list, ipfs) => {
        const value = [];
        await (async () => {
            // @ts-ignore
            for await (const result of compatible_add_1.default(ipfs, data, addOptions)) {
                value.push(result);
            }
        })()
            .then(e => {
            list.push({
                status: "fulfilled",
                value,
            });
        })
            .catch(error => {
            list.push({
                status: "rejected",
                reason: {
                    error,
                    value,
                },
            });
        });
        return list;
    }, []);
}
exports.publishToIPFSAll = publishToIPFSAll;
exports.default = publishToIPFSAll;
//# sourceMappingURL=all.js.map