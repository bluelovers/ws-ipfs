"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv2cli = exports.opts2cli = exports.opts2argv = exports.argv2opts = exports._OptionsAndArgvKeyMap = void 0;
exports._OptionsAndArgvKeyMap = [
    ['silent', 'silent'],
    ['repoAutoMigrate', 'migrate'],
    ['offline', 'offline'],
    ['pass', 'pass'],
    ['argv', 'argv'],
];
/**
 * @see https://github.com/ipfs/js-ipfs/blob/63d4d353c606e4fd487811d8a0014bb2173f11be/packages/ipfs/src/cli/commands/daemon.js#L48
 */
function argv2opts(argvOptions, ipfsOptions = {}) {
    var _a, _b, _c;
    exports._OptionsAndArgvKeyMap
        .forEach(([ipfsOptionsKey, argvOptionsKey]) => {
        var _a;
        ipfsOptions[ipfsOptionsKey] = (_a = argvOptions[argvOptionsKey]) !== null && _a !== void 0 ? _a : ipfsOptions[ipfsOptionsKey];
    });
    ipfsOptions.preload = argvOptions.enablePreload ? {
        enabled: argvOptions.enablePreload,
    } : ipfsOptions.preload;
    (_a = ipfsOptions.EXPERIMENTAL) !== null && _a !== void 0 ? _a : (ipfsOptions.EXPERIMENTAL = {});
    ipfsOptions.EXPERIMENTAL.ipnsPubsub = (_b = argvOptions.enableNamesysPubsub) !== null && _b !== void 0 ? _b : ipfsOptions.EXPERIMENTAL.ipnsPubsub;
    ipfsOptions.EXPERIMENTAL.sharding = (_c = argvOptions.enableShardingExperiment) !== null && _c !== void 0 ? _c : ipfsOptions.EXPERIMENTAL.sharding;
    /*
    ipfsOptions.init = argvOptions.initProfile ? {
        profiles: argvOptions.initProfile,
    } : (ipfsOptions.init ?? true);
     */
    return ipfsOptions;
}
exports.argv2opts = argv2opts;
function opts2argv(ipfsOptions, argvOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    exports._OptionsAndArgvKeyMap
        .forEach(([ipfsOptionsKey, argvOptionsKey]) => {
        var _a;
        argvOptions[ipfsOptionsKey] = (_a = ipfsOptions[argvOptionsKey]) !== null && _a !== void 0 ? _a : argvOptions[ipfsOptionsKey];
    });
    argvOptions.enablePreload = (_b = (_a = ipfsOptions.preload) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : argvOptions.enablePreload;
    argvOptions.enableNamesysPubsub = (_d = (_c = ipfsOptions.EXPERIMENTAL) === null || _c === void 0 ? void 0 : _c.ipnsPubsub) !== null && _d !== void 0 ? _d : argvOptions.enableNamesysPubsub;
    argvOptions.enableShardingExperiment = (_f = (_e = ipfsOptions.EXPERIMENTAL) === null || _e === void 0 ? void 0 : _e.sharding) !== null && _f !== void 0 ? _f : argvOptions.enableShardingExperiment;
    /*
        if (!isNullOrUndefined(ipfsOptions.init))
        {
            if (typeof ipfsOptions.init === 'boolean')
            {
                argvOptions.initProfile = ipfsOptions.init;
            }
            else if (typeof ipfsOptions.init.profiles === 'boolean')
            {
                argvOptions.initProfile = ipfsOptions.init.profiles
            }
        }
     */
    return argvOptions;
}
exports.opts2argv = opts2argv;
function opts2cli(ipfsOptions) {
    return argv2cli(opts2argv(ipfsOptions));
}
exports.opts2cli = opts2cli;
function argv2cli(argvOptions) {
    var _a;
    let args = [];
    if ((_a = argvOptions.argv) === null || _a === void 0 ? void 0 : _a.length) {
        args.push(...argvOptions.argv);
    }
    if (argvOptions.pass) {
        args.push('--pass', argvOptions.pass);
    }
    if (argvOptions.offline) {
        args.push('--offline');
    }
    if (typeof argvOptions.enablePreload === 'boolean') {
        args.push('--enable-preload', argvOptions.enablePreload);
    }
    if (argvOptions.enableShardingExperiment) {
        args.push('--enable-sharding-experiment');
    }
    if (argvOptions.enableNamesysPubsub) {
        args.push('--enable-namesys-pubsub');
    }
    if (argvOptions.migrate) {
        args.push('--migrate');
    }
    return args;
}
exports.argv2cli = argv2cli;
//# sourceMappingURL=daemon.js.map