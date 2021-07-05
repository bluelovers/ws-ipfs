"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsGatewayAddresses = exports.ipfsApiAddresses = exports.ipfsAddresses = exports.assertCheckIPFS = exports.checkIPFS = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
function checkIPFS(ipfs) {
    return bluebird_1.default.resolve(ipfs)
        .then(async (ipfs) => {
        let bool;
        const timeout = 2000;
        //await ipfs.id();
        bool = await ipfs
            .version({
            timeout,
        })
            .then(v => !!v);
        if (!bool) {
            bool = await ipfs
                .id({
                timeout,
            })
                .then(v => !!v);
        }
        return bool;
    });
}
exports.checkIPFS = checkIPFS;
function assertCheckIPFS(ipfs) {
    return checkIPFS(ipfs)
        .then(bool => {
        if (!bool) {
            return Promise.reject(new TypeError('invalid ipfs'));
        }
        return bool;
    });
}
exports.assertCheckIPFS = assertCheckIPFS;
async function ipfsAddresses(ipfs) {
    return ipfs.config.get('Addresses');
}
exports.ipfsAddresses = ipfsAddresses;
async function ipfsApiAddresses(ipfs) {
    return ipfs.config.get('Addresses.API');
}
exports.ipfsApiAddresses = ipfsApiAddresses;
async function ipfsGatewayAddresses(ipfs) {
    return ipfs.config.get('Addresses.Gateway');
}
exports.ipfsGatewayAddresses = ipfsGatewayAddresses;
//# sourceMappingURL=api.js.map