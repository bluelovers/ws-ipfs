"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.find = exports.some = exports.getDefaultServerList = void 0;
const ipfs_util_lib_1 = require("ipfs-util-lib");
const util_1 = require("./util");
Object.defineProperty(exports, "getDefaultServerList", { enumerable: true, get: function () { return util_1.getDefaultServerList; } });
async function some(ipfsClient, configs, skipCheck) {
    let ipfs;
    for (let argv of configs) {
        try {
            ipfs = ipfsClient(...argv);
            if (!skipCheck) {
                //await ipfs.id();
                await ipfs_util_lib_1.checkIPFS(ipfs);
            }
            break;
        }
        catch (e) { }
    }
    return ipfs;
}
exports.some = some;
function find(ipfsHttpModule) {
    return async function findIpfsClient(ipfsServerList, options = {}) {
        let { clientArgvs = [] } = options;
        return some(ipfsHttpModule, ipfsServerList
            .filter(address => address)
            .map(address => {
            return [address, ...clientArgvs];
        }), options.skipCheck);
    };
}
exports.find = find;
function use(ipfsHttpModule) {
    return async function ipfsClient(...argvs) {
        const [config, ...argv] = argvs;
        if (typeof config === 'undefined' || config === null) {
            return find(ipfsHttpModule)(util_1.getDefaultServerList(), {
                clientArgvs: argv,
            });
        }
        return ipfsHttpModule(config, ...argv);
    };
}
exports.use = use;
exports.default = use;
//# sourceMappingURL=core.js.map