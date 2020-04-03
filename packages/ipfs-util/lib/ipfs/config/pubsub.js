"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configPubsub = void 0;
const setConfigIfNotExists_1 = require("../../util/setConfigIfNotExists");
function configPubsub(ipfs) {
    return setConfigIfNotExists_1.setConfigIfNotExistsLazy(ipfs, [
        ['Pubsub.Router', 'gossipsub', (oldValue) => !oldValue],
        ['Pubsub.Enabled', true, (oldValue) => !oldValue],
        ['relay.Pubsub.Enabled', true, (oldValue) => !oldValue],
    ]);
}
exports.configPubsub = configPubsub;
exports.default = configPubsub;
//# sourceMappingURL=pubsub.js.map