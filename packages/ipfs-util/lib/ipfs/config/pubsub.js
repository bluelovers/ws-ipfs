"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configPubsub = void 0;
const setConfigIfNotExists_1 = require("../../util/setConfigIfNotExists");
function configPubsub(ipfs) {
    const options = {
        filter: (oldValue) => !oldValue
    };
    return setConfigIfNotExists_1.setConfigIfNotExistsLazy(ipfs, [
        ['Pubsub.Router', 'gossipsub', options],
        ['Pubsub.Enabled', true, options],
        ['relay.Pubsub.Enabled', true, options],
    ]);
}
exports.configPubsub = configPubsub;
exports.default = configPubsub;
//# sourceMappingURL=pubsub.js.map