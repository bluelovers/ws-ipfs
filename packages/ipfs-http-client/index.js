"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const core_1 = __importDefault(require("./core"));
/**
 * auto detect go-ipfs and js-ipfs
 */
exports.ipfsClient = core_1.default(ipfs_http_client_1.default);
exports.default = exports.ipfsClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUE4QztBQUM5QyxrREFBeUI7QUFFekI7O0dBRUc7QUFDVSxRQUFBLFVBQVUsR0FBRyxjQUFHLENBQUMsMEJBQWUsQ0FBQyxDQUFDO0FBRS9DLGtCQUFlLGtCQUFVLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX2lwZnNIdHRwTW9kdWxlIGZyb20gJ2lwZnMtaHR0cC1jbGllbnQnXG5pbXBvcnQgdXNlIGZyb20gJy4vY29yZSc7XG5cbi8qKlxuICogYXV0byBkZXRlY3QgZ28taXBmcyBhbmQganMtaXBmc1xuICovXG5leHBvcnQgY29uc3QgaXBmc0NsaWVudCA9IHVzZShfaXBmc0h0dHBNb2R1bGUpO1xuXG5leHBvcnQgZGVmYXVsdCBpcGZzQ2xpZW50XG4iXX0=