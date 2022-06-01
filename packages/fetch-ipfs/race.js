"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceFetchIPFS = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2020/3/22.
 */
const p_any_1 = tslib_1.__importDefault(require("p-any"));
const index_1 = require("./index");
const ipfs_server_list_1 = require("ipfs-server-list");
const array_hyper_unique_1 = require("array-hyper-unique");
const handleClientList_1 = require("./lib/handleClientList");
const util_1 = require("./util");
function raceFetchIPFS(cid, useIPFS, timeout, options) {
    const cid2 = (0, util_1.handleCID)(cid, true, options);
    timeout = (0, util_1.handleTimeout)(timeout);
    return (0, handleClientList_1.handleClientList)(useIPFS, (ipfs => typeof (ipfs === null || ipfs === void 0 ? void 0 : ipfs.cat) === 'function'))
        .then(ps => {
        var _a, _b;
        let fetchOptions = {
            ...options === null || options === void 0 ? void 0 : options.fetchOptions,
            redirect: 'follow',
        };
        options = {
            ...options,
            fetchOptions,
        };
        (_a = fetchOptions.timeout) !== null && _a !== void 0 ? _a : (fetchOptions.timeout = options.timeout);
        // @ts-ignore
        (_b = fetchOptions.signal) !== null && _b !== void 0 ? _b : (fetchOptions.signal = options.signal);
        let controller;
        if (timeout && !fetchOptions.signal) {
            controller = (0, util_1.newAbortController)(timeout).controller;
            // @ts-ignore
            fetchOptions.signal = controller.signal;
        }
        const ls = ps.map(ipfs => {
            return (0, index_1.fetchIPFSCore)(cid2, ipfs, timeout, options);
        });
        (0, array_hyper_unique_1.array_unique)([
            (0, util_1.handleCID)(cid, null),
            ...(0, ipfs_server_list_1.filterList)('Gateway').map(gateway => (0, util_1.handleCID)(cid, null, {
                prefix: {
                    ipfs: gateway,
                },
            })),
        ])
            .forEach(cid => {
            ls.push((0, index_1.fetchIPFSCore)(cid, null, timeout, options));
        });
        return (0, p_any_1.default)(ls, {
            filter(buf) {
                var _a, _b;
                return (buf === null || buf === void 0 ? void 0 : buf.length) > 0 && ((_b = (_a = options === null || options === void 0 ? void 0 : options.filter) === null || _a === void 0 ? void 0 : _a.call(options, buf)) !== null && _b !== void 0 ? _b : true);
            },
        }).finally(() => controller === null || controller === void 0 ? void 0 : controller.abort());
    });
}
exports.raceFetchIPFS = raceFetchIPFS;
exports.default = raceFetchIPFS;
//# sourceMappingURL=race.js.map