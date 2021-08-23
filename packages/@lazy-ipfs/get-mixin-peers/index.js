"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsMixinPeers = exports.ipfsSwarmAddrsPeers = exports.ipfsSwarmPeers = exports.ipfsPubsubPeers = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const array_hyper_unique_1 = require("array-hyper-unique");
async function ipfsPubsubPeers(ipfs, topic, options) {
    return ipfs.pubsub.peers(topic, options);
}
exports.ipfsPubsubPeers = ipfsPubsubPeers;
async function ipfsSwarmPeers(ipfs, options) {
    return ipfs.swarm.peers(options)
        .then(ls => ls.map(value => {
        return value.peer;
    }));
}
exports.ipfsSwarmPeers = ipfsSwarmPeers;
async function ipfsSwarmAddrsPeers(ipfs, options) {
    return ipfs.swarm.addrs(options)
        .then(ls => ls.map(value => {
        return value.id;
    }));
}
exports.ipfsSwarmAddrsPeers = ipfsSwarmAddrsPeers;
function ipfsMixinPeers(ipfs, topic, options) {
    return bluebird_1.default.props({
        pubsub: (topic === null || topic === void 0 ? void 0 : topic.length) && ipfsPubsubPeers(ipfs, topic, options).catch(e => []),
        swarm: ipfsSwarmPeers(ipfs, options).catch(e => []),
        addrs: ipfsSwarmAddrsPeers(ipfs, options).catch(e => []),
    })
        .then(data => {
        var _a, _b, _c;
        (_a = data.pubsub) !== null && _a !== void 0 ? _a : (data.pubsub = []);
        (_b = data.swarm) !== null && _b !== void 0 ? _b : (data.swarm = []);
        (_c = data.addrs) !== null && _c !== void 0 ? _c : (data.addrs = []);
        return (0, array_hyper_unique_1.array_unique_overwrite)([...data.pubsub, ...data.swarm, ...data.addrs].filter(Boolean).map(String));
    });
}
exports.ipfsMixinPeers = ipfsMixinPeers;
//# sourceMappingURL=index.js.map