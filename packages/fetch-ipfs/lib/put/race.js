"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToIPFSRace = void 0;
const tslib_1 = require("tslib");
const handleClientList_1 = require("../handleClientList");
const util_1 = require("../../util");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const compatible_add_1 = (0, tslib_1.__importDefault)(require("@lazy-ipfs/compatible-add"));
function publishToIPFSRace(data, useIPFS, options) {
    let { timeout, signal, addOptions } = options || {};
    timeout = (0, util_1.handleTimeout)(timeout);
    addOptions = {
        timeout,
        signal,
        ...addOptions,
    };
    let controller;
    if (addOptions.timeout && !addOptions.signal) {
        controller = (0, util_1.newAbortController)(addOptions.timeout).controller;
        addOptions.signal = controller.signal;
    }
    return new bluebird_1.default(async (resolve, reject) => {
        const list = [];
        await (0, handleClientList_1.handleClientList)(useIPFS, (ipfs => typeof (ipfs === null || ipfs === void 0 ? void 0 : ipfs.add) === 'function'))
            .each(async (ipfs) => {
            const value = [];
            await (async () => {
                // @ts-ignore
                for await (const result of (0, compatible_add_1.default)(ipfs, data, addOptions)) {
                    value.push(result);
                }
            })()
                .then(e => {
                resolve([
                    {
                        status: "fulfilled",
                        value,
                    },
                ]);
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
        });
        resolve(list);
    }).finally(() => controller === null || controller === void 0 ? void 0 : controller.abort());
}
exports.publishToIPFSRace = publishToIPFSRace;
exports.default = publishToIPFSRace;
//# sourceMappingURL=race.js.map