"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIpfsClient = exports.ipfsClient = void 0;
const tslib_1 = require("tslib");
const ipfs_http_client_1 = tslib_1.__importDefault(require("ipfs-http-client"));
const core_1 = tslib_1.__importStar(require("./core"));
/**
 * auto detect go-ipfs and js-ipfs
 */
exports.ipfsClient = (0, core_1.default)(ipfs_http_client_1.default);
exports.findIpfsClient = (0, core_1.find)(ipfs_http_client_1.default);
exports.default = exports.ipfsClient;
//# sourceMappingURL=index.js.map