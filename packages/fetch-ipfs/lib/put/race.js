"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToIPFSRace = void 0;
const handleClientList_1 = require("../handleClientList");
const util_1 = require("../../util");
const bluebird_1 = __importDefault(require("bluebird"));
function publishToIPFSRace(data, useIPFS, options) {
    let { timeout, signal, addOptions } = options || {};
    timeout = util_1.handleTimeout(timeout);
    addOptions = {
        timeout,
        signal,
        ...addOptions,
    };
    return new bluebird_1.default(async (resolve, reject) => {
        const list = [];
        await handleClientList_1.handleClientList(useIPFS, (ipfs => typeof (ipfs === null || ipfs === void 0 ? void 0 : ipfs.add) === 'function'))
            .each(async (ipfs) => {
            const value = [];
            await (async () => {
                for await (const result of ipfs.add(data, addOptions)) {
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
    });
}
exports.publishToIPFSRace = publishToIPFSRace;
exports.default = publishToIPFSRace;
//# sourceMappingURL=race.js.map