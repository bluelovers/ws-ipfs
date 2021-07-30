"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeAllURL = void 0;
const tslib_1 = require("tslib");
const bluebird_allsettled_1 = require("bluebird-allsettled");
const pokeURL_1 = (0, tslib_1.__importDefault)(require("./pokeURL"));
const _handleOptions_1 = require("./util/_handleOptions");
function pokeAllURL(ipfsURL, options) {
    const opts = (0, _handleOptions_1._handleOptions)(options);
    return (0, bluebird_allsettled_1.allSettled)([ipfsURL].flat().map(ipfsURL => (0, pokeURL_1.default)(ipfsURL, opts)));
}
exports.pokeAllURL = pokeAllURL;
//# sourceMappingURL=pokeAllURL.js.map