"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeAll = void 0;
async function unsubscribeAll(ipfs) {
    for (const topic of await ipfs.pubsub.ls()) {
        await ipfs.pubsub.unsubscribe(topic).catch(e => null);
    }
}
exports.unsubscribeAll = unsubscribeAll;
//# sourceMappingURL=unsubscribe.js.map