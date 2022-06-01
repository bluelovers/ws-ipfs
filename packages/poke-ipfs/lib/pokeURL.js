"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeURL = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2020/4/3.
 */
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const util_1 = require("./util");
const _parsePokeResponse_1 = require("./util/_parsePokeResponse");
const _handleOptions_1 = require("./util/_handleOptions");
function pokeURL(ipfsURL, options) {
    let url = (0, util_1.corsURL)(ipfsURL.toString(), options === null || options === void 0 ? void 0 : options.cors);
    const { fetchOptions, controller } = (0, _handleOptions_1._handleOptions)(options);
    return (0, cross_fetch_1.default)(url.href, fetchOptions)
        .then(_parsePokeResponse_1._parsePokeResponse)
        .catch(e => (0, _parsePokeResponse_1._pokeError)(e, url.href))
        .finally(() => controller === null || controller === void 0 ? void 0 : controller.abort());
}
exports.pokeURL = pokeURL;
exports.default = pokeURL;
//# sourceMappingURL=pokeURL.js.map