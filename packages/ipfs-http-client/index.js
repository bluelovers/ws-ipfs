"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsClient = void 0;
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const core_1 = __importDefault(require("./core"));
/**
 * auto detect go-ipfs and js-ipfs
 */
exports.ipfsClient = core_1.default(ipfs_http_client_1.default);
exports.default = exports.ipfsClient;
//# sourceMappingURL=index.js.map