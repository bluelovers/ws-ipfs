"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsApiType = void 0;
async function ipfsApiType(ipfs, timeout) {
    var _a;
    if (typeof timeout !== 'number') {
        timeout = void 0;
    }
    timeout || (timeout = 5000);
    const i = await ipfs.id({
        timeout,
    }).catch(e => null);
    let apiType;
    if ((_a = i === null || i === void 0 ? void 0 : i.agentVersion) === null || _a === void 0 ? void 0 : _a.match(/(js|go)-ipfs/i)) {
        apiType = RegExp.$1.toLowerCase();
    }
    if (apiType === void 0) {
        const v = await ipfs.version({
            timeout,
        }).catch(e => null);
        if (v === null || v === void 0 ? void 0 : v.golang) {
            apiType = 'go';
        }
    }
    return apiType;
}
exports.ipfsApiType = ipfsApiType;
exports.default = ipfsApiType;
//# sourceMappingURL=index.js.map