"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToIPFSAll = void 0;
const tslib_1 = require("tslib");
const handleClientList_1 = require("../handleClientList");
const util_1 = require("../../util");
const compatible_add_1 = (0, tslib_1.__importDefault)(require("@lazy-ipfs/compatible-add"));
function publishToIPFSAll(data, useIPFS, options) {
    let { timeout, signal, addOptions } = options || {};
    timeout = (0, util_1.handleTimeout)(timeout);
    addOptions = {
        timeout,
        signal,
        ...addOptions,
    };
    return (0, handleClientList_1.handleClientList)(useIPFS, (ipfs => typeof (ipfs === null || ipfs === void 0 ? void 0 : ipfs.add) === 'function'))
        .reduce(async (list, ipfs) => {
        const value = [];
        await (async () => {
            // @ts-ignore
            for await (const result of (0, compatible_add_1.default)(ipfs, data, addOptions)) {
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