"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeURL = void 0;
/**
 * Created by user on 2020/4/3.
 */
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const util_1 = require("./util");
const abort_controller_timer_1 = require("abort-controller-timer");
function pokeURL(ipfsURL, options) {
    let url = util_1.corsURL(ipfsURL.toString(), options === null || options === void 0 ? void 0 : options.cors);
    let fetchOptions = {
        method: 'HEAD',
    };
    let controller = new abort_controller_timer_1.AbortControllerTimer((options === null || options === void 0 ? void 0 : options.timeout) || 1000);
    fetchOptions.signal = controller.signal;
    return cross_fetch_1.default(url.href, fetchOptions)
        .then(async (res) => {
        var _a, _b;
        const { headers, status, statusText } = res;
        let xIpfsPath = ((_a = headers.get) === null || _a === void 0 ? void 0 : _a.call(headers, 'x-ipfs-path')) || ((_b = headers.get) === null || _b === void 0 ? void 0 : _b['X-Ipfs-Path']) || headers['x-ipfs-path'] || headers['X-Ipfs-Path'];
        if (!xIpfsPath) {
            Object.entries(headers)
                .some(([key, value]) => {
                if (key.toLowerCase() === 'x-ipfs-path') {
                    xIpfsPath = value;
                    return true;
                }
            });
        }
        if (xIpfsPath) {
            return {
                value: xIpfsPath,
                status,
                statusText,
                headers,
            };
        }
        else if (status < 200 || status >= 400) {
            return {
                value: false,
                status,
                statusText,
                headers,
            };
        }
        return {
            value: null,
            status,
            statusText,
            headers,
        };
    })
        .catch((error) => {
        return {
            error,
        };
    })
        .finally(() => controller.clear());
}
exports.pokeURL = pokeURL;
exports.default = pokeURL;
//# sourceMappingURL=pokeURL.js.map