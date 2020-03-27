"use strict";
/**
 * Created by user on 2020/3/27.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJSZip = exports.fromString = exports.fromBuffer = void 0;
const jszip_1 = __importDefault(require("jszip"));
function fromBuffer(buf, options) {
    return fromJSZip(Promise.resolve(buf)
        .then(data => jszip_1.default.loadAsync(data, options === null || options === void 0 ? void 0 : options.jsZipLoadOptions)), options);
}
exports.fromBuffer = fromBuffer;
function fromString(base64, options) {
    return fromJSZip(Promise.resolve(base64)
        .then(data => jszip_1.default.loadAsync(data, {
        base64: true,
        ...options === null || options === void 0 ? void 0 : options.jsZipLoadOptions,
    })), options);
}
exports.fromString = fromString;
async function* fromJSZip(zip, options) {
    zip = await Promise.resolve(zip);
    const keys = Object.keys(zip.files);
    const { prefixPath = '' } = options || {};
    for (const file of keys) {
        const path = prefixPath + file;
        const zfo = zip.files[file];
        if (zfo.dir) {
            continue;
        }
        const fo = {
            path,
            content: await zfo.async('array'),
            mode: undefined,
            mtime: zfo.date,
        };
        yield fo;
    }
}
exports.fromJSZip = fromJSZip;
exports.default = fromBuffer;
//# sourceMappingURL=index.js.map