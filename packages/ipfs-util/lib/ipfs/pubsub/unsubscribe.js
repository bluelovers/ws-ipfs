"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeAll = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
function unsubscribeAll(ipfs) {
    return bluebird_1.default.mapSeries(ipfs.pubsub.ls(), (topic) => {
        return ipfs.pubsub.unsubscribe(topic);
    });
}
exports.unsubscribeAll = unsubscribeAll;
//# sourceMappingURL=unsubscribe.js.map