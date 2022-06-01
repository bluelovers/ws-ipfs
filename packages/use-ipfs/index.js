"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPFS = exports.useIPFS = void 0;
const tslib_1 = require("tslib");
const ipfs_http_client_1 = tslib_1.__importDefault(require("@bluelovers/ipfs-http-client"));
const core_1 = require("@bluelovers/ipfs-http-client/core");
const ctl_1 = tslib_1.__importDefault(require("./lib/ctl"));
const cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
const types_1 = require("./lib/types");
const ipfs_http_client_2 = tslib_1.__importDefault(require("ipfs-http-client"));
const ipfs_util_lib_1 = require("ipfs-util-lib");
const default_1 = tslib_1.__importDefault(require("ipfs-util-lib/lib/ipfs/config/default"));
const unsubscribe_1 = require("ipfs-util-lib/lib/ipfs/pubsub/unsubscribe");
const check_ipfs_connect_1 = require("@lazy-ipfs/check-ipfs-connect");
let _cached;
/**
 * get IPFS, if not exists, create or connect it
 */
async function useIPFS(options, optionsExtra = {}) {
    if (typeof _cached === 'undefined' || typeof _cached === null) {
        let ret = await getIPFS(options, optionsExtra);
        //console.dir({ ipfs, ipfsType })
        let { stop: closeFnOld, ipfs } = ret;
        await (0, check_ipfs_connect_1.assertCheckIPFS)(ipfs)
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
            return (0, unsubscribe_1.unsubscribeAll)(ipfs)
                .catch(e => null)
                .then(e => {
                return bool && (closeFnOld === null || closeFnOld === void 0 ? void 0 : closeFnOld(...argv).then(() => {
                    bool = void 0;
                    if ((_cached === null || _cached === void 0 ? void 0 : _cached.ipfs) === ipfs) {
                        _cached = void 0;
                    }
                    ipfs = void 0;
                    closeFnOld = void 0;
                    //console.debug(`reset _cached => null`)
                }));
            });
        };
        _cached = Object.freeze({
            ...ret,
            stop,
        });
        await (0, default_1.default)(ipfs).catch(e => null);
        ret = void 0;
    }
    // @ts-ignore
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
            if (options === null || options === void 0 ? void 0 : options.disposable) {
                ipfsd = await (0, ctl_1.default)(options);
                ipfs = ipfsd.api;
                await (0, check_ipfs_connect_1.assertCheckIPFS)(ipfs);
                ipfsType = types_1.EnumIPFSType.Controller;
                return;
            }
            let fallbackServerArgvs;
            if (typeof optionsExtra.fallbackServer !== 'undefined') {
                let fallbackServer = optionsExtra.fallbackServer;
                fallbackServerArgvs = [fallbackServer];
            }
            try {
                ipfs = await (0, core_1.getCreateClientFn)(ipfs_http_client_1.default)(optionsExtra === null || optionsExtra === void 0 ? void 0 : optionsExtra.serverAddr);
                if (!((optionsExtra === null || optionsExtra === void 0 ? void 0 : optionsExtra.skipCheck) && (optionsExtra === null || optionsExtra === void 0 ? void 0 : optionsExtra.serverAddr))) {
                    await (0, check_ipfs_connect_1.assertCheckIPFS)(ipfs);
                }
                ipfsType = types_1.EnumIPFSType.Client;
            }
            catch (e) {
                if (optionsExtra.useFallbackFirst && (fallbackServerArgvs === null || fallbackServerArgvs === void 0 ? void 0 : fallbackServerArgvs.length)) {
                    ipfs = await (0, core_1.some)(ipfs_http_client_2.default, [fallbackServerArgvs], true)
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
                    ipfsd = await (0, ctl_1.default)(options);
                    ipfs = ipfsd.api;
                    await (0, check_ipfs_connect_1.assertCheckIPFS)(ipfs);
                    ipfsType = types_1.EnumIPFSType.Controller;
                }
                catch (e) {
                    await stop(true);
                    if (fallbackServerArgvs && fallbackServerArgvs.length) {
                        ipfsd = undefined;
                        ipfs = await (0, core_1.some)(ipfs_http_client_2.default, [fallbackServerArgvs], true)
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
        let { skipClose } = optionsExtra;
        async function stop(force) {
            var _a, _b, _c;
            if (force || ipfsd && !skipClose) {
                try {
                    await ((_a = ipfsd === null || ipfsd === void 0 ? void 0 : ipfsd.clean) === null || _a === void 0 ? void 0 : _a.call(ipfsd));
                }
                catch (e) {
                }
                try {
                    await ((_b = ipfsd === null || ipfsd === void 0 ? void 0 : ipfsd.stop) === null || _b === void 0 ? void 0 : _b.call(ipfsd));
                }
                catch (e) {
                }
                try {
                    await ((_c = ipfs === null || ipfs === void 0 ? void 0 : ipfs.stop) === null || _c === void 0 ? void 0 : _c.call(ipfs));
                }
                catch (e) {
                }
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
            // @ts-ignore
            ipfs,
            ipfsType,
            stop,
            async address() {
                let addr = await (0, ipfs_util_lib_1.ipfsAddresses)(ipfs);
                return (0, cloneDeep_1.default)(addr);
            },
            get ipfsd() {
                return ipfsd;
            },
        });
    });
}
exports.getIPFS = getIPFS;
exports.default = useIPFS;
//# sourceMappingURL=index.js.map