"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsApiType = void 0;
async function ipfsApiType(ipfs) {
    var _a;
    const i = await ipfs.id().catch(e => null);
    let apiType;
    if ((_a = i === null || i === void 0 ? void 0 : i.agentVersion) === null || _a === void 0 ? void 0 : _a.match(/(js|go)-ipfs/i)) {
        apiType = RegExp.$1.toLowerCase();
    }
    if (apiType === void 0) {
        const v = await ipfs.version().catch(e => null);
        if (v === null || v === void 0 ? void 0 : v.golang) {
            apiType = 'go';
        }
    }
    return apiType;
}
exports.ipfsApiType = ipfsApiType;
exports.default = ipfsApiType;
//# sourceMappingURL=index.js.map