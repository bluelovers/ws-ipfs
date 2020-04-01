"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.some = void 0;
const ipfs_util_lib_1 = require("ipfs-util-lib");
const ipfs_env_1 = __importDefault(require("ipfs-env"));
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
        const [config, ...argv] = argvs;
        if (typeof config === 'undefined' || config === null) {
            const configs = [];
            const { IPFS_ADDRESSES_API } = ipfs_env_1.default();
            if (typeof IPFS_ADDRESSES_API === 'string' && IPFS_ADDRESSES_API.length) {
                configs.push([IPFS_ADDRESSES_API, ...argv]);
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