"use strict";
/**
 * Created by user on 2020/2/27.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixIPFSOptions = void 0;
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
const ipfs_defaults_1 = require("ipfs-defaults");
function fixIPFSOptions(options) {
    var _a, _b, _c, _d, _e;
    options = (0, defaultsDeep_1.default)({}, options, {
        type: 'js',
        //ipfsModule: require('ipfs'),
        //ipfsHttpModule: require('ipfs-http-client'),
        //ipfsBin: require.resolve('ipfs/src/cli/bin.js'),
        ipfsOptions: (0, ipfs_defaults_1.mergeDefaultOptions)({
            config: (0, ipfs_defaults_1.mergeDefaultConfig)((_a = options === null || options === void 0 ? void 0 : options.ipfsOptions) === null || _a === void 0 ? void 0 : _a.config),
        }),
        disposable: false,
    });
    if (!options.disposable) {
        options.ipfsOptions.config = (0, defaultsDeep_1.default)(options.ipfsOptions.config, {
            Addresses: {
                ...(0, ipfs_defaults_1.createDefaultAddresses)({}, options.type),
            },
        });
    }
    if (options.type === 'js' || options.type === 'proc') {
        if (typeof options.ipfsModule === 'undefined') {
            options.ipfsModule = require('ipfs');
        }
        if (typeof options.ipfsHttpModule === 'undefined') {
            options.ipfsHttpModule = require('ipfs-http-client');
        }
        if (typeof options.ipfsBin === 'undefined') {
            options.ipfsBin = require.resolve('ipfs/src/cli/bin.js');
        }
    }
    // @ts-ignore
    options.ipfsOptions.repoAutoMigrate = options.ipfsOptions.migrate = options.repoAutoMigrate = options.migrate = (_e = (_d = (_c = (_b = options.migrate) !== null && _b !== void 0 ? _b : options.repoAutoMigrate) !== null && _c !== void 0 ? _c : options.ipfsOptions.migrate) !== null && _d !== void 0 ? _d : options.ipfsOptions.repoAutoMigrate) !== null && _e !== void 0 ? _e : true;
    return options;
}
exports.fixIPFSOptions = fixIPFSOptions;
//# sourceMappingURL=ipfsd.js.map