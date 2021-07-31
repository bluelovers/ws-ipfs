"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsAddresses = exports.assertCheckIPFS = exports.checkIPFS = exports.ipfsGatewayAddresses = exports.ipfsApiAddresses = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
var ipfs_api_url_1 = require("@lazy-ipfs/ipfs-api-url");
Object.defineProperty(exports, "ipfsApiAddresses", { enumerable: true, get: function () { return ipfs_api_url_1.ipfsApiAddresses; } });
Object.defineProperty(exports, "ipfsGatewayAddresses", { enumerable: true, get: function () { return ipfs_api_url_1.ipfsGatewayAddresses; } });
function checkIPFS(ipfs) {
    return assertCheckIPFS(ipfs)
        .catch(() => null);
}
exports.checkIPFS = checkIPFS;
function assertCheckIPFS(ipfs) {
    return bluebird_1.default.resolve(ipfs)
        .then(async (ipfs) => {
        let bool;
        const timeout = 2000;
        let _error;
        bool = await ipfs
            .version({
            timeout,
        })
            .then(v => !!v)
            .catch(e => {
            _error = e;
            return null;
        });
        if (!bool) {
            bool = await ipfs
                .id({
                timeout,
            })
                .then(v => !!v)
                .catch(e => {
                _error = e;
                return null;
            });
        }
        if (!bool) {
            throw (_error || new Error('Invalid ipfs'));
        }
        return bool;
    });
}
exports.assertCheckIPFS = assertCheckIPFS;
async function ipfsAddresses(ipfs) {
    return ipfs.config.get('Addresses');
}
exports.ipfsAddresses = ipfsAddresses;
//# sourceMappingURL=api.js.map