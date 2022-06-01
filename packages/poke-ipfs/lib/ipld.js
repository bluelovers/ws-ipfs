"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeIPLD = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2020/4/3.
 */
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const ndjson_1 = require("./ndjson");
const util_1 = require("./util");
const abort_controller_timer_1 = require("abort-controller-timer");
const _parsePokeResponse_1 = require("./util/_parsePokeResponse");
function pokeIPLD(cid, options) {
    let url = (0, util_1.corsURL)('https://node0.preload.ipfs.io/api/v0/refs', options === null || options === void 0 ? void 0 : options.cors);
    url.searchParams.set('r', 'true');
    url.searchParams.set('arg', cid.toString());
    let fetchOptions = {};
    let controller = new abort_controller_timer_1.AbortControllerTimer((options === null || options === void 0 ? void 0 : options.timeout) || 1000);
    fetchOptions.signal = controller.signal;
    return (0, cross_fetch_1.default)(url.href, fetchOptions)
        .then(async (res) => {
        const { headers, status, statusText } = res;
        for await (const chunk of (0, ndjson_1.ndjson)(res.body)) {
            if (chunk === null || chunk === void 0 ? void 0 : chunk.Ref) {
                return {
                    value: true,
                    status,
                    statusText,
                    headers,
                };
            }
        }
        if (status < 200 || status >= 400) {
            return {
                value: false,
                status,
                statusText,
                headers,
            };
        }
        return {
            //value: null as void,
            status,
            statusText,
            headers,
        };
    })
        .catch(e => (0, _parsePokeResponse_1._pokeError)(e, url.href))
        .finally(() => controller.clear());
}
exports.pokeIPLD = pokeIPLD;
exports.default = pokeIPLD;
//# sourceMappingURL=ipld.js.map