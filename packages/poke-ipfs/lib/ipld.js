"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeIPLD = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const ndjson_1 = require("./ndjson");
function pokeIPLD(cid) {
    let url = new URL('https://node0.preload.ipfs.io/api/v0/refs');
    url.searchParams.set('r', 'true');
    url.searchParams.set('arg', cid.toString());
    return cross_fetch_1.default(url.href)
        .then(async (r) => {
        for await (const chunk of ndjson_1.ndjson(r.body)) {
            if (chunk === null || chunk === void 0 ? void 0 : chunk.Ref) {
                return true;
            }
        }
        return false;
    })
        .catch(e => null);
}
exports.pokeIPLD = pokeIPLD;
exports.default = pokeIPLD;
//# sourceMappingURL=ipld.js.map