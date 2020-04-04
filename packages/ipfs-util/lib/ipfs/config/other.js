"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configOthers = void 0;
const setConfigIfNotExists_1 = require("../../util/setConfigIfNotExists");
const bootstrap_1 = __importDefault(require("ipfs-server-list/bootstrap"));
const array_hyper_unique_1 = require("array-hyper-unique");
function configOthers(ipfs) {
    const wss = '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star';
    const bs = array_hyper_unique_1.array_unique(bootstrap_1.default);
    return setConfigIfNotExists_1.setConfigIfNotExistsLazy(ipfs, [
        ['Discovery.MDNS.Enabled', true],
        ['Discovery.webRTCStar.Enabled', true],
        [
            'Addresses.Swarm',
            (oldValue) => {
                oldValue = oldValue !== null && oldValue !== void 0 ? oldValue : [];
                if (!oldValue.includes(wss)) {
                    oldValue.push(wss);
                }
                return oldValue;
            },
            {
                filter(oldValue) {
                    return !(oldValue === null || oldValue === void 0 ? void 0 : oldValue.includes(wss));
                },
            }
        ],
        [
            'Bootstrap',
            (oldValue) => {
                oldValue = oldValue !== null && oldValue !== void 0 ? oldValue : [];
                bs.forEach(addr => {
                    if (!oldValue.includes(addr)) {
                        oldValue.push(addr);
                    }
                });
                return oldValue;
            },
            {
                filter() {
                    return true;
                },
            }
        ],
        ['Routing.Type', 'dht'],
        ['Gateway.HTTPHeaders.Access-Control-Allow-Methods', [
                'HEAD',
                'GET'
            ]],
        ['Gateway.HTTPHeaders.Access-Control-Allow-Origin', [
                '*'
            ]],
        ['Gateway.HTTPHeaders.Access-Control-Allow-Headers', [
                'X-Requested-With',
                'Range',
                'User-Agent'
            ]],
    ]);
}
exports.configOthers = configOthers;
exports.default = configOthers;
//# sourceMappingURL=other.js.map