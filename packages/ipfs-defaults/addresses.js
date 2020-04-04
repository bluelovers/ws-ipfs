"use strict";
/**
 * Created by user on 2020/4/4.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultAddresses = exports.getDefaultAddressesPorts = void 0;
function getDefaultAddressesPorts(ports, type = 'js') {
    let config;
    if (type === 'go') {
        config = {
            Swarm: (ports === null || ports === void 0 ? void 0 : ports.Swarm) || 4001,
            Swarm2: (ports === null || ports === void 0 ? void 0 : ports.Swarm2) || 4001,
            API: (ports === null || ports === void 0 ? void 0 : ports.API) || 5001,
            Gateway: (ports === null || ports === void 0 ? void 0 : ports.Gateway) || 8080,
        };
    }
    else {
        const Swarm = (ports === null || ports === void 0 ? void 0 : ports.Swarm) || 4002;
        const Swarm2 = (ports === null || ports === void 0 ? void 0 : ports.Swarm2) || Swarm + 1;
        config = {
            Swarm,
            Swarm2,
            API: (ports === null || ports === void 0 ? void 0 : ports.API) || 5002,
            Gateway: (ports === null || ports === void 0 ? void 0 : ports.Gateway) || 9090,
        };
    }
    return config;
}
exports.getDefaultAddressesPorts = getDefaultAddressesPorts;
function createDefaultAddresses(ports, type = 'js') {
    ports = getDefaultAddressesPorts(ports, type);
    let config;
    if (type === 'go') {
        config = {
            Swarm: [
                `/ip4/0.0.0.0/tcp/${ports.Swarm}`,
                `/ip6/::/tcp/${ports.Swarm2}`,
            ],
            API: `/ip4/127.0.0.1/tcp/${ports.API}`,
            Gateway: `/ip4/127.0.0.1/tcp/${ports.Gateway}`,
        };
    }
    else {
        config = {
            Swarm: [
                `/ip4/0.0.0.0/tcp/${ports.Swarm}`,
                `/ip4/127.0.0.1/tcp/${ports.Swarm2}/ws`,
            ],
            API: `/ip4/127.0.0.1/tcp/${ports.API}`,
            Gateway: `/ip4/127.0.0.1/tcp/${ports.Gateway}`,
        };
    }
    return config;
}
exports.createDefaultAddresses = createDefaultAddresses;
exports.default = createDefaultAddresses;
//# sourceMappingURL=addresses.js.map