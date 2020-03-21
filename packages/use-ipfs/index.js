"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPFS = exports.useIPFS = void 0;
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const core_1 = require("@bluelovers/ipfs-http-client/core");
const ctl_1 = __importDefault(require("./lib/ctl"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const util_1 = require("./lib/util");
const types_1 = require("./lib/types");
const ipfs_http_client_2 = __importDefault(require("ipfs-http-client"));
let _cached;
/**
 * get IPFS, if not exists, create or connect it
 */
async function useIPFS(options, optionsExtra = {}) {
    if (typeof _cached === 'undefined' || typeof _cached === null) {
        let ret = await getIPFS(options, optionsExtra);
        //console.dir({ ipfs, ipfsType })
        let { stop: closeFnOld, ipfs } = ret;
        await util_1.checkIPFS(ipfs)
            .catch(async (e) => {
            if (optionsExtra === null || optionsExtra === void 0 ? void 0 : optionsExtra.skipCheck) {
                e && console.warn(`[checkIPFS]`, String(e));
            }
            else {
                await closeFnOld().catch(e => null);
                return Promise.reject(e);
            }
        });
        let bool = true;
        const stop = (...argv) => {
            return bool && closeFnOld(...argv)
                .then(() => {
                bool = void 0;
                if (_cached && _cached.ipfs === ipfs) {
                    _cached = void 0;
                }
                ipfs = void 0;
                closeFnOld = void 0;
                //console.debug(`reset _cached => null`)
            });
        };
        _cached = Object.freeze({
            ...ret,
            stop,
        });
        ret = void 0;
    }
    return _cached;
}
exports.useIPFS = useIPFS;
/**
 * create or connect it
 */
async function getIPFS(options, optionsExtra = {}) {
    return new Promise(async (resolve, reject) => {
        let ipfs;
        let ipfsd;
        let ipfsType = types_1.EnumIPFSType.Unknown;
        await (async () => {
            let fallbackServerArgvs;
            if (typeof optionsExtra.fallbackServer !== 'undefined') {
                let fallbackServer = optionsExtra.fallbackServer;
                fallbackServerArgvs = [fallbackServer];
            }
            try {
                ipfs = await ipfs_http_client_1.default(optionsExtra === null || optionsExtra === void 0 ? void 0 : optionsExtra.serverAddr);
                if (!((optionsExtra === null || optionsExtra === void 0 ? void 0 : optionsExtra.skipCheck) && (optionsExtra === null || optionsExtra === void 0 ? void 0 : optionsExtra.serverAddr))) {
                    await util_1.checkIPFS(ipfs);
                }
                ipfsType = types_1.EnumIPFSType.Client;
            }
            catch (e) {
                if (optionsExtra.useFallbackFirst && fallbackServerArgvs && fallbackServerArgvs.length) {
                    ipfs = await core_1.some(ipfs_http_client_2.default, [fallbackServerArgvs], true)
                        .then(ipfs => {
                        //checkIPFS(ipfs);
                        ipfsType = types_1.EnumIPFSType.ClientFallback;
                        return ipfs;
                    })
                        .catch(e => null);
                    if (ipfs) {
                        return;
                    }
                }
                //console.error(e)
                try {
                    ipfsd = await ctl_1.default(options);
                    ipfs = ipfsd.api;
                    await util_1.checkIPFS(ipfs);
                    ipfsType = types_1.EnumIPFSType.Controller;
                }
                catch (e) {
                    await stop();
                    if (fallbackServerArgvs && fallbackServerArgvs.length) {
                        ipfsd = undefined;
                        ipfs = await core_1.some(ipfs_http_client_2.default, [fallbackServerArgvs], true)
                            .then(ipfs => {
                            //checkIPFS(ipfs);
                            ipfsType = types_1.EnumIPFSType.ClientFallback;
                            return ipfs;
                        });
                        if (ipfs) {
                            return;
                        }
                    }
                    else {
                        console.error(e);
                    }
                    return reject(e);
                }
            }
        })();
        async function stop() {
            try {
                ipfsd && await ipfsd.stop();
            }
            catch (e) {
            }
            try {
                ipfs && await ipfs.stop();
            }
            catch (e) {
            }
        }
        process.once('SIGINT', (...argv) => {
            //console.debug('[SIGINT]', 'shutting down...', argv);
            return stop();
        });
        process.once('SIGTERM', (...argv) => {
            //console.debug('[SIGTERM]', 'shutting down...', argv);
            return stop();
        });
        process.once('exit', (...argv) => {
            //console.debug('[exit]', 'shutting down...', argv);
            return stop();
        });
        resolve({
            ipfs,
            ipfsType,
            stop,
            async address() {
                let addr = await util_1.ipfsAddresses(ipfs);
                return cloneDeep_1.default(addr);
            },
        });
    });
}
exports.getIPFS = getIPFS;
exports.default = useIPFS;
//# sourceMappingURL=index.js.map