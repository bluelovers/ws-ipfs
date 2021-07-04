"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configApiSwarm = void 0;
const setConfigIfNotExists_1 = require("../../util/setConfigIfNotExists");
async function configApiSwarm(ipfs) {
    return (0, setConfigIfNotExists_1.setConfigIfNotExistsLazy)(ipfs, [
        ['Swarm.EnableAutoNATService', true],
        ['Swarm.EnableAutoRelay', true],
        ['Swarm.EnableRelayHop', true],
    ]);
}
exports.configApiSwarm = configApiSwarm;
exports.default = configApiSwarm;
//# sourceMappingURL=swarm.js.map