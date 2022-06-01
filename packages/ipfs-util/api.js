"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsAddresses = exports.assertCheckIPFS = exports.checkIPFS = exports.ipfsGatewayAddresses = exports.ipfsApiAddresses = void 0;
var ipfs_api_url_1 = require("@lazy-ipfs/ipfs-api-url");
Object.defineProperty(exports, "ipfsApiAddresses", { enumerable: true, get: function () { return ipfs_api_url_1.ipfsApiAddresses; } });
Object.defineProperty(exports, "ipfsGatewayAddresses", { enumerable: true, get: function () { return ipfs_api_url_1.ipfsGatewayAddresses; } });
var check_ipfs_connect_1 = require("@lazy-ipfs/check-ipfs-connect");
Object.defineProperty(exports, "checkIPFS", { enumerable: true, get: function () { return check_ipfs_connect_1.checkIPFS; } });
Object.defineProperty(exports, "assertCheckIPFS", { enumerable: true, get: function () { return check_ipfs_connect_1.assertCheckIPFS; } });
async function ipfsAddresses(ipfs) {
    return ipfs.config.get('Addresses');
}
exports.ipfsAddresses = ipfsAddresses;
//# sourceMappingURL=api.js.map