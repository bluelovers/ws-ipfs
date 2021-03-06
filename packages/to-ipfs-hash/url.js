"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUrl = void 0;
const tslib_1 = require("tslib");
const url_source_1 = (0, tslib_1.__importDefault)(require("ipfs-utils/src/files/url-source"));
const index_1 = (0, tslib_1.__importDefault)(require("./index"));
const BufferList_1 = (0, tslib_1.__importDefault)(require("bl/BufferList"));
async function fromUrl(url, options) {
    const buf = new BufferList_1.default();
    for await (const file of (0, url_source_1.default)(url)) {
        for await (const chunk of file.content) {
            buf.append(chunk);
        }
    }
    return (0, index_1.default)(buf, options);
}
exports.fromUrl = fromUrl;
exports.default = fromUrl;
//# sourceMappingURL=url.js.map