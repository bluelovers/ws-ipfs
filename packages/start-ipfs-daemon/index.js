"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startIPFSDaemon = exports.getIPFSDaemonOptions = void 0;
const daemon_1 = __importDefault(require("ipfs/src/cli/daemon"));
const ipfs_env_1 = __importDefault(require("ipfs-env"));
function getIPFSDaemonOptions(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    options = options || {};
    let { daemonOptions = {} } = options;
    let repo;
    if (options.disposable) {
    }
    else {
        repo = (_a = options.repoPath) !== null && _a !== void 0 ? _a : (0, ipfs_env_1.default)().IPFS_PATH;
    }
    daemonOptions = {
        preload: { enabled: (_b = options === null || options === void 0 ? void 0 : options.enablePreload) !== null && _b !== void 0 ? _b : true },
        init: options.initProfile ? { profiles: options.initProfile } : (_c = daemonOptions.init) !== null && _c !== void 0 ? _c : true,
        ...daemonOptions,
        config: (_d = options.initConfig) !== null && _d !== void 0 ? _d : daemonOptions.config,
        repo,
        repoAutoMigrate: (_f = (_e = options.migrate) !== null && _e !== void 0 ? _e : daemonOptions.repoAutoMigrate) !== null && _f !== void 0 ? _f : true,
        EXPERIMENTAL: {
            ...daemonOptions.EXPERIMENTAL,
            pubsub: (_j = (_g = options.enablePubsub) !== null && _g !== void 0 ? _g : (_h = daemonOptions.EXPERIMENTAL) === null || _h === void 0 ? void 0 : _h.pubsub) !== null && _j !== void 0 ? _j : true,
            ipnsPubsub: (_m = (_k = options.enableNamesysPubsub) !== null && _k !== void 0 ? _k : (_l = daemonOptions.EXPERIMENTAL) === null || _l === void 0 ? void 0 : _l.ipnsPubsub) !== null && _m !== void 0 ? _m : true,
            dht: (_q = (_o = options.enableDhtExperiment) !== null && _o !== void 0 ? _o : (_p = daemonOptions.EXPERIMENTAL) === null || _p === void 0 ? void 0 : _p.dht) !== null && _q !== void 0 ? _q : true,
            sharding: (_t = (_r = options === null || options === void 0 ? void 0 : options.enableShardingExperiment) !== null && _r !== void 0 ? _r : (_s = daemonOptions.EXPERIMENTAL) === null || _s === void 0 ? void 0 : _s.sharding) !== null && _t !== void 0 ? _t : true,
        },
    };
    return daemonOptions;
}
exports.getIPFSDaemonOptions = getIPFSDaemonOptions;
/**
 * start js ipfs daemon
 */
function startIPFSDaemon(options) {
    const daemonOptions = getIPFSDaemonOptions(options);
    const daemon = new daemon_1.default(daemonOptions);
    return daemon;
}
exports.startIPFSDaemon = startIPFSDaemon;
exports.default = startIPFSDaemon;
//# sourceMappingURL=index.js.map