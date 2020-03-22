"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceFetchIPFS = void 0;
const p_any_1 = __importDefault(require("p-any"));
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const index_1 = require("./index");
const bluebird_1 = __importDefault(require("bluebird"));
const ipfs_util_lib_1 = require("ipfs-util-lib");
function raceFetchIPFS(cid, useIPFS, timeout) {
    const cid2 = index_1.handleCID(cid, true);
    timeout = index_1.handleTimeout(timeout);
    if (!Array.isArray(useIPFS)) {
        useIPFS = [useIPFS];
    }
    return bluebird_1.default
        .map(useIPFS, (ipfs) => {
        if (!ipfs) {
            return;
        }
        else if (typeof ipfs === 'string') {
            return ipfs_http_client_1.default(ipfs);
        }
        // @ts-ignore
        else if (typeof ipfs === 'object' && typeof ipfs.cat !== 'undefined') {
            if (!Object.keys(ipfs).length) {
                return;
            }
            return ipfs_http_client_1.default(ipfs);
        }
        else if (ipfs) {
            return ipfs;
        }
    })
        .filter(ipfs => {
        return ipfs_util_lib_1.checkIPFS(ipfs).catch(e => false);
    })
        .then(ps => {
        const ls = ps.map(ipfs => {
            return index_1.fetchIPFSCore(cid2, ipfs, timeout);
        });
        ls.push(index_1.fetchIPFSCore(cid, null, timeout));
        return p_any_1.default(ls, {
            filter(buf) {
                return (buf === null || buf === void 0 ? void 0 : buf.length) > 0;
            }
        });
    });
}
exports.raceFetchIPFS = raceFetchIPFS;
exports.default = raceFetchIPFS;
//# sourceMappingURL=race.js.map