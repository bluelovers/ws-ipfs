"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClientList = void 0;
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const bluebird_1 = __importDefault(require("bluebird"));
function handleClientList(useIPFS, filter) {
    return bluebird_1.default
        .resolve(useIPFS)
        .then(useIPFS => {
        if (!Array.isArray(useIPFS)) {
            return [useIPFS];
        }
        return useIPFS;
    })
        // @ts-ignore
        .map(async (ipfs) => {
        if (!ipfs) {
            return;
        }
        else if (typeof ipfs === 'string') {
            return (0, ipfs_http_client_1.default)(ipfs)
                .catch(e => null);
        }
        else if (filter && await filter(ipfs)) {
            return ipfs;
        }
        // @ts-ignore
        else if (typeof ipfs === 'object' && (ipfs.port || ipfs.host)) {
            return (0, ipfs_http_client_1.default)(ipfs)
                .catch(e => null);
        }
        else if (ipfs) {
            return ipfs;
        }
        return;
    })
        .filter((ipfs) => {
        if (ipfs) {
            if (filter) {
                return filter(ipfs);
            }
            return true;
        }
    });
}
exports.handleClientList = handleClientList;
//# sourceMappingURL=handleClientList.js.map