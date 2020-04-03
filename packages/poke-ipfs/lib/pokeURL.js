"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeURL = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
function pokeURL(ipfsURL) {
    let url = new URL(ipfsURL.toString());
    return cross_fetch_1.default(url.href, {
        method: 'HEAD',
    })
        .then(async (res) => {
        var _a, _b;
        const headers = res.headers;
        let xIpfsPath = ((_a = headers.get) === null || _a === void 0 ? void 0 : _a.call(headers, 'x-ipfs-path')) || ((_b = headers.get) === null || _b === void 0 ? void 0 : _b['X-Ipfs-Path']) || (headers === null || headers === void 0 ? void 0 : headers['x-ipfs-path']) || (headers === null || headers === void 0 ? void 0 : headers['x-ipfs-path']);
        if (xIpfsPath) {
            return xIpfsPath;
        }
        else if (res.status < 200 || res.status >= 400) {
            return false;
        }
        return null;
    })
        .catch(e => null);
}
exports.pokeURL = pokeURL;
exports.default = pokeURL;
//# sourceMappingURL=pokeURL.js.map