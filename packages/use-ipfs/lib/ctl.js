"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startIPFS = void 0;
const ipfsd_ctl_1 = require("ipfsd-ctl");
const utils_1 = require("ipfsd-ctl/src/utils");
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const fs_1 = require("./util/fs");
const ipfsd_1 = require("./util/ipfsd");
const ipfs_util_lib_1 = require("ipfs-util-lib");
const addresses_1 = __importStar(require("ipfs-defaults/addresses"));
const get_port_1 = __importDefault(require("get-port"));
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
async function startIPFS(options) {
    options = ipfsd_1.fixIPFSOptions(options);
    if (options === null || options === void 0 ? void 0 : options.disposable) {
        let ports = addresses_1.getDefaultAddressesPorts({}, options.type);
        ports.Swarm = await get_port_1.default({ port: ports.Swarm });
        ports.Swarm2 = await get_port_1.default({ port: ports.Swarm2 });
        ports.API = await get_port_1.default({ port: ports.API });
        ports.Gateway = await get_port_1.default({ port: ports.Gateway });
        options.ipfsOptions.config = defaultsDeep_1.default(options.ipfsOptions.config, {
            Addresses: {
                ...addresses_1.default(ports, options.type),
            },
        });
    }
    let ipfsd = await ipfsd_ctl_1.createController(options);
    let addr = await utils_1.checkForRunningApi(ipfsd.path);
    if (addr) {
        let ipfs;
        try {
            ipfs = await ipfs_http_client_1.default(addr);
            await ipfs_util_lib_1.checkIPFS(ipfs);
        }
        catch (e) {
            try {
                await ipfs.stop();
            }
            catch (e) { }
            await fs_1.unlinkIPFSApi(ipfsd.path);
        }
        finally {
            try {
                //await ipfs.stop();
            }
            catch (e) { }
            ipfs = void 0;
        }
    }
    !ipfsd.initialized && await ipfsd.init();
    !ipfsd.started && await ipfsd.start();
    await ipfs_util_lib_1.checkIPFS(ipfsd.api);
    return ipfsd;
}
exports.startIPFS = startIPFS;
exports.default = startIPFS;
//# sourceMappingURL=ctl.js.map