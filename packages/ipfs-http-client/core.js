"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.some = void 0;
const ipfs_util_lib_1 = require("ipfs-util-lib");
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
function use(ipfsHttpModule) {
    return async function ipfsClient(...argvs) {
        let [config, ...argv] = argvs;
        if (typeof config === 'undefined' || config === null) {
            let configs = [];
            if (typeof process !== 'undefined' && typeof process.env.IPFS_ADDRESSES_API === 'string') {
                configs.push([process.env.IPFS_ADDRESSES_API, ...argv]);
            }
            configs.push([{ port: '5001' }, ...argv]);
            configs.push([{ port: '5002' }, ...argv]);
            return some(ipfsHttpModule, configs);
        }
        return ipfsHttpModule(config, ...argv);
    };
}
exports.use = use;
exports.default = use;
//# sourceMappingURL=core.js.map