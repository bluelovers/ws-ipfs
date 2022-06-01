"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startIPFS = exports.getPort2 = void 0;
const tslib_1 = require("tslib");
const ipfsd_ctl_1 = require("ipfsd-ctl");
const utils_1 = require("ipfsd-ctl/src/utils");
const ipfs_http_client_1 = tslib_1.__importDefault(require("ipfs-http-client"));
const ipfsd_1 = require("./util/ipfsd");
const addresses_1 = tslib_1.__importStar(require("ipfs-defaults/addresses"));
const defaultsDeep_1 = tslib_1.__importDefault(require("lodash/defaultsDeep"));
// @ts-ignore
const find_free_port_sync_fixed_1 = tslib_1.__importDefault(require("find-free-port-sync-fixed"));
const unlinkIPFSApi_1 = require("fix-ipfs/lib/ipfsd-ctl/unlinkIPFSApi");
const core_1 = require("@bluelovers/ipfs-http-client/core");
const check_ipfs_connect_1 = require("@lazy-ipfs/check-ipfs-connect");
const usedPort = new Set();
async function getPort2(options) {
    let port = await (0, find_free_port_sync_fixed_1.default)({
        start: options.port,
    });
    let start = port;
    while (usedPort.has(port)) {
        start += 100;
        port = await (0, find_free_port_sync_fixed_1.default)({
            start,
        });
    }
    usedPort.add(port);
    return port;
}
exports.getPort2 = getPort2;
async function startIPFS(options) {
    options = (0, ipfsd_1.fixIPFSOptions)(options);
    if (options === null || options === void 0 ? void 0 : options.disposable) {
        let ports = (0, addresses_1.getDefaultAddressesPorts)({}, options.type);
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
        options.ipfsOptions.config = (0, defaultsDeep_1.default)(options.ipfsOptions.config, {
            Addresses: {
                ...(0, addresses_1.default)(ports, options.type),
            },
        });
    }
    let ipfsd = await (0, ipfsd_ctl_1.createController)(options);
    let addr = await (0, utils_1.checkForRunningApi)(ipfsd.path);
    if (addr) {
        let ipfs;
        try {
            ipfs = await (0, core_1.getCreateClientFn)(ipfs_http_client_1.default)(addr);
            await (0, check_ipfs_connect_1.assertCheckIPFS)(ipfs);
        }
        catch (e) {
            try {
                await ipfs.stop();
            }
            catch (e) { }
            await (0, unlinkIPFSApi_1.unlinkIPFSApi)(ipfsd.path);
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
    await (0, check_ipfs_connect_1.assertCheckIPFS)(ipfsd.api);
    return ipfsd;
}
exports.startIPFS = startIPFS;
exports.default = startIPFS;
//# sourceMappingURL=ctl.js.map