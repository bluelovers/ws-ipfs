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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startIPFS = exports.getPort2 = void 0;
const ipfsd_ctl_1 = require("ipfsd-ctl");
const utils_1 = require("ipfsd-ctl/src/utils");
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const ipfsd_1 = require("./util/ipfsd");
const ipfs_util_lib_1 = require("ipfs-util-lib");
const addresses_1 = __importStar(require("ipfs-defaults/addresses"));
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
// @ts-ignore
const find_free_port_sync_fixed_1 = __importDefault(require("find-free-port-sync-fixed"));
const unlinkIPFSApi_1 = require("fix-ipfs/lib/ipfsd-ctl/unlinkIPFSApi");
const usedPort = new Set();
async function getPort2(options) {
    let port = await find_free_port_sync_fixed_1.default({
        start: options.port,
    });
    let start = port;
    while (usedPort.has(port)) {
        start += 100;
        port = await find_free_port_sync_fixed_1.default({
            start,
        });
    }
    usedPort.add(port);
    return port;
}
exports.getPort2 = getPort2;
async function startIPFS(options) {
    options = ipfsd_1.fixIPFSOptions(options);
    if (options === null || options === void 0 ? void 0 : options.disposable) {
        let ports = addresses_1.getDefaultAddressesPorts({}, options.type);
        let Swarm2 = 0;
        /*
        Swarm2 = await getPort2({ port: ports.Swarm2 as number });

        if (Swarm2 != ports.Swarm2)
        {
            Swarm2 = 10000;
        }
        else
        {
            Swarm2 = 0;
        }

         */
        ports.Swarm = await getPort2({ port: ports.Swarm + Swarm2 });
        ports.Swarm2 = await getPort2({ port: ports.Swarm2 + Swarm2 });
        ports.API = await getPort2({ port: ports.API + Swarm2 });
        ports.Gateway = await getPort2({ port: ports.Gateway + Swarm2 });
        //console.dir(ports)
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
            await unlinkIPFSApi_1.unlinkIPFSApi(ipfsd.path);
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