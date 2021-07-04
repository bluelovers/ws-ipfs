"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.find = exports.some = exports.getCreateClientFn = exports.getDefaultServerList = void 0;
const ipfs_util_lib_1 = require("ipfs-util-lib");
const util_1 = require("./util");
Object.defineProperty(exports, "getDefaultServerList", { enumerable: true, get: function () { return util_1.getDefaultServerList; } });
function getCreateClientFn(ipfsClient) {
    if (typeof ipfsClient.create === 'function') {
        return ipfsClient.create;
    }
    else if (typeof ipfsClient === 'function') {
        return ipfsClient;
    }
    throw new TypeError(`${ipfsClient} is not import('ipfs-http-client')`);
}
exports.getCreateClientFn = getCreateClientFn;
async function some(ipfsClient, configs, skipCheck, checkIPFSFn) {
    let ipfs;
    const create = getCreateClientFn(ipfsClient);
    // @ts-ignore
    checkIPFSFn !== null && checkIPFSFn !== void 0 ? checkIPFSFn : (checkIPFSFn = ipfs_util_lib_1.checkIPFS);
    for (let argv of configs) {
        try {
            ipfs = create(...argv);
            if (!skipCheck) {
                //await ipfs.id();
                if (await checkIPFSFn(ipfs)) {
                    return ipfs;
                }
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
        }), options.skipCheck, options.checkIPFSFn);
    };
}
exports.find = find;
function use(ipfsHttpModule) {
    return async function ipfsClient(...argvs) {
        const [config, ...argv] = argvs;
        if (typeof config === 'undefined' || config === null) {
            return find(ipfsHttpModule)((0, util_1.getDefaultServerList)(), {
                clientArgvs: argv,
            });
        }
        return getCreateClientFn(ipfsHttpModule)(config, ...argv);
    };
}
exports.use = use;
exports.default = use;
//# sourceMappingURL=core.js.map