"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiaddrToURL = void 0;
const multiaddr_to_uri_1 = __importDefault(require("multiaddr-to-uri"));
function multiaddrToURL(multiaddr, opts) {
    return new URL((0, multiaddr_to_uri_1.default)(multiaddr, opts));
}
exports.multiaddrToURL = multiaddrToURL;
exports.default = multiaddrToURL;
//# sourceMappingURL=index.js.map