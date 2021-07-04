"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDefaultEXPERIMENTAL = void 0;
const lodash_1 = require("lodash");
function mergeDefaultEXPERIMENTAL(EXPERIMENTAL = {}) {
    return (0, lodash_1.merge)({
        pubsub: true,
        ipnsPubsub: true,
        sharding: true,
        dht: true,
        FilestoreEnabled: true,
        Libp2pStreamMounting: false,
        P2pHttpProxy: false,
        PreferTLS: false,
        QUIC: true,
        ShardingEnabled: true,
        UrlstoreEnabled: true,
    }, EXPERIMENTAL);
}
exports.mergeDefaultEXPERIMENTAL = mergeDefaultEXPERIMENTAL;
exports.default = mergeDefaultEXPERIMENTAL;
//# sourceMappingURL=EXPERIMENTAL.js.map