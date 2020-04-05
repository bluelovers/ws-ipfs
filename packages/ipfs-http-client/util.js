"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultServerList = void 0;
const ipfs_env_1 = __importDefault(require("ipfs-env"));
function getDefaultServerList(options = {}) {
    const ipfsServerList = [];
    const { IPFS_ADDRESSES_API } = ipfs_env_1.default();
    if (typeof IPFS_ADDRESSES_API === 'string' && IPFS_ADDRESSES_API.length) {
        ipfsServerList.push(IPFS_ADDRESSES_API);
    }
    const { urlObject = {
        /**
         * https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs-http-client/src/lib/core.js
         */
        host: typeof window === 'undefined' ? void 0 : '127.0.0.1',
        protocol: typeof window === 'undefined' ? void 0 : 'http',
    }, } = options;
    ipfsServerList.push({
        ...urlObject,
        port: '5002',
    });
    ipfsServerList.push({
        ...urlObject,
        port: '5001',
    });
    return ipfsServerList;
}
exports.getDefaultServerList = getDefaultServerList;
//# sourceMappingURL=util.js.map