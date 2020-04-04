"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDefaultConfig = void 0;
const lodash_1 = require("lodash");
const bootstrap_1 = __importDefault(require("ipfs-server-list/bootstrap"));
const EXPERIMENTAL_1 = __importDefault(require("./EXPERIMENTAL"));
function mergeDefaultConfig(config = {}) {
    return lodash_1.merge({
        API: {
            HTTPHeaders: {
                'Access-Control-Allow-Methods': [
                    'HEAD',
                    'PUT',
                    'GET',
                    'POST',
                ],
            },
        },
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
            ],
        },
        Discovery: {
            MDNS: {
                Enabled: true,
                Interval: 10,
            },
            webRTCStar: {
                Enabled: true,
            },
        },
        Gateway: {
            'HTTPHeaders': {
                'Access-Control-Allow-Methods': [
                    'HEAD',
                    'GET'
                ],
            },
        },
        EXPERIMENTAL: EXPERIMENTAL_1.default(),
        Bootstrap: lodash_1.uniq(bootstrap_1.default),
        Pubsub: {
            Router: 'gossipsub',
            Enabled: true,
        },
        Swarm: {
            ConnMgr: {
                LowWater: 200,
                HighWater: 500,
            },
            EnableAutoNATService: true,
            EnableAutoRelay: true,
            EnableRelayHop: true,
        },
        'Routing': {
            'Type': 'dht'
        },
    }, lodash_1.defaultsDeep(config, {
        API: {
            HTTPHeaders: {
                'Access-Control-Allow-Credentials': [
                    'true',
                ],
                'Access-Control-Allow-Headers': [
                    'Authorization',
                ],
                'Access-Control-Allow-Methods': [
                    'HEAD',
                    'PUT',
                    'GET',
                    'POST',
                ],
                'Access-Control-Allow-Origin': [
                    '*',
                ],
                'Access-Control-Expose-Headers': [
                    'Location',
                ],
            },
        },
        Gateway: {
            'HTTPHeaders': {
                'Access-Control-Allow-Headers': [
                    'X-Requested-With',
                    'Range',
                    'User-Agent'
                ],
                'Access-Control-Allow-Origin': [
                    '*'
                ]
            },
        },
    }));
}
exports.mergeDefaultConfig = mergeDefaultConfig;
exports.default = mergeDefaultConfig;
//# sourceMappingURL=config.js.map