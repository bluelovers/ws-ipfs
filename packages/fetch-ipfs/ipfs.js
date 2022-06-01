"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catIPFS = exports.refIPFS = void 0;
const tslib_1 = require("tslib");
//import { Buffer } from "buffer";
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const util_1 = require("./util");
const to_cid_1 = require("@lazy-ipfs/to-cid");
const cid_to_string_1 = require("@lazy-ipfs/cid-to-string");
function refIPFS(cid, ipfs, timeout, options) {
    timeout = timeout |= 0 || 10 * 1000;
    const { controller, timer } = (0, util_1.newAbortController)(timeout);
    return bluebird_1.default.resolve()
        .then(async () => {
        for await (const ref of ipfs.refs((0, cid_to_string_1.cidToString)((0, to_cid_1.toCID)(cid)), {
            timeout,
            signal: controller.signal,
            preload: true,
            //pin: false,
        })) {
            if (ref.err) {
                return Promise.reject(ref.err);
            }
            else {
                return ref;
            }
        }
    })
        .finally(() => controller.clear());
}
exports.refIPFS = refIPFS;
function catIPFS(cid, ipfs, timeout, options) {
    timeout = timeout |= 0 || 60 * 1000;
    const { controller, timer } = (0, util_1.newAbortController)(timeout);
    return refIPFS(cid, ipfs, timeout, options)
        .catch(Error, async (e) => {
        if (e.message && e.message.toLowerCase().includes('ipfs method not allowed')) {
            //console.warn(String(e).replace(/\s+$/, ''), `\nurl: ${e.response.url}`, `\nwill ignore this error and trying fetch content`);
            return;
        }
        return Promise.reject(e);
    })
        .then(async () => {
        const chunks = [];
        for await (const chunk of ipfs.cat((0, cid_to_string_1.cidToString)((0, to_cid_1.toCID)(cid)), {
            timeout,
            signal: controller.signal,
            preload: true,
            //pin: false,
        })) {
            // @ts-ignore
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    })
        .finally(() => {
        controller.abort();
    });
}
exports.catIPFS = catIPFS;
exports.default = catIPFS;
//# sourceMappingURL=ipfs.js.map