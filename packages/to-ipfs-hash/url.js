"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUrl = exports.urlSource = void 0;
const tslib_1 = require("tslib");
const url_source_1 = (0, tslib_1.__importDefault)(require("ipfs-utils/src/files/url-source"));
const index_1 = (0, tslib_1.__importDefault)(require("./index"));
function urlSource(url, options) {
    return (0, url_source_1.default)(url, options);
}
exports.urlSource = urlSource;
async function fromUrl(url, options) {
    const file = urlSource(url);
    return (0, index_1.default)(file.content, options);
}
exports.fromUrl = fromUrl;
exports.default = fromUrl;
//# sourceMappingURL=url.js.map