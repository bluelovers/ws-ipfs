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
        .then(async (res) => {
        const { status, statusText } = res;
        for await (const chunk of ndjson_1.ndjson(res.body)) {
            if (chunk === null || chunk === void 0 ? void 0 : chunk.Ref) {
                return {
                    value: true,
                    status,
                    statusText,
                };
            }
        }
        if (status < 200 || status >= 400) {
            return {
                value: false,
                status,
                statusText,
            };
        }
        return {
            //value: null as void,
            status,
            statusText,
        };
    })
        .catch((error) => {
        return {
            error,
        };
    });
}
exports.pokeIPLD = pokeIPLD;
exports.default = pokeIPLD;
//# sourceMappingURL=ipld.js.map