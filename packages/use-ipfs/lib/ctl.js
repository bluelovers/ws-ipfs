"use strict";
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
async function startIPFS(options) {
    let ipfsd = await ipfsd_ctl_1.createController(ipfsd_1.fixIPFSOptions(options));
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