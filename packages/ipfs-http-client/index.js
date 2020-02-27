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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUE4QztBQUM5QyxrREFBeUI7QUFJekI7O0dBRUc7QUFDVSxRQUFBLFVBQVUsR0FBRyxjQUFHLENBQUMsMEJBQWUsQ0FBQyxDQUFDO0FBRS9DLGtCQUFlLGtCQUFVLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX2lwZnNIdHRwTW9kdWxlIGZyb20gJ2lwZnMtaHR0cC1jbGllbnQnXG5pbXBvcnQgdXNlIGZyb20gJy4vY29yZSc7XG5cbmV4cG9ydCB0eXBlIHsgSUlQRlNDbGllbnRGbldyYXAsIElJUEZTQ2xpZW50Rm4sIElJUEZTQ2xpZW50UmV0dXJuLCBJSVBGU0NsaWVudFBhcmFtZXRlcnMsIElJUEZTQ2xpZW50QWRkcmVzc2VzVVJMLCBJSVBGU0NsaWVudEFkZHJlc3NlcyB9IGZyb20gJy4vbGliL3R5cGVzJztcblxuLyoqXG4gKiBhdXRvIGRldGVjdCBnby1pcGZzIGFuZCBqcy1pcGZzXG4gKi9cbmV4cG9ydCBjb25zdCBpcGZzQ2xpZW50ID0gdXNlKF9pcGZzSHR0cE1vZHVsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGlwZnNDbGllbnRcbiJdfQ==