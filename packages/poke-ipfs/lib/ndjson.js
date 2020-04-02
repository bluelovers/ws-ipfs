"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ndjson = void 0;
const util_1 = require("util");
/**
 * Parses NDJSON chunks from an iterator
 */
async function* ndjson(source) {
    const decoder = new util_1.TextDecoder();
    let buf = '';
    for await (const chunk of source) {
        buf += decoder.decode(chunk, { stream: true });
        const lines = buf.split(/\r?\n/);
        for (let i = 0; i < lines.length - 1; i++) {
            const l = lines[i].trim();
            if (l.length > 0) {
                yield JSON.parse(l);
            }
        }
        buf = lines[lines.length - 1];
    }
    buf += decoder.decode();
    buf = buf.trim();
    if (buf.length !== 0) {
        yield JSON.parse(buf);
    }
}
exports.ndjson = ndjson;
exports.default = ndjson;
//# sourceMappingURL=ndjson.js.map