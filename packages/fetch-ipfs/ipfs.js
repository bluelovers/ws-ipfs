"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catIPFS = exports.refIPFS = void 0;
const buffer_1 = require("buffer");
const bluebird_1 = __importDefault(require("bluebird"));
function refIPFS(cid, ipfs, timeout) {
    timeout = timeout |= 0 || 20 * 1000;
    return bluebird_1.default.resolve()
        .then(async () => {
        for await (const ref of ipfs.refs(cid, {
            timeout,
        })) {
            if (ref.err) {
                return Promise.reject(ref.err);
            }
            else {
                return ref;
            }
        }
    });
}
exports.refIPFS = refIPFS;
function catIPFS(cid, ipfs, timeout) {
    timeout = timeout |= 0 || 60 * 1000;
    return refIPFS(cid, ipfs)
        .catch(Error, async (e) => {
        if (e.message && e.message.toLowerCase().includes('ipfs method not allowed')) {
            console.warn(String(e).replace(/\s+$/, ''), `\nurl: ${e.response.url}`, `\nwill ignore this error and trying fetch content`);
            return;
        }
        return Promise.reject(e);
    })
        .then(async () => {
        const chunks = [];
        for await (const chunk of ipfs.cat(cid, {
            timeout,
        })) {
            chunks.push(chunk);
        }
        return buffer_1.Buffer.concat(chunks);
    });
}
exports.catIPFS = catIPFS;
exports.default = catIPFS;
//# sourceMappingURL=ipfs.js.map