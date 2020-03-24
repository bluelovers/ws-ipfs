"use strict";
///<reference lib="es2020" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToIPFSAll = void 0;
const handleClientList_1 = require("../handleClientList");
const util_1 = require("../../util");
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
        let value = [];
        await (async () => {
            for await (const result of ipfs.add(data, addOptions)) {
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
//# sourceMappingURL=all.js.map