"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configOthers = void 0;
const tslib_1 = require("tslib");
const setConfigIfNotExists_1 = require("../../util/setConfigIfNotExists");
const bootstrap_1 = (0, tslib_1.__importDefault)(require("ipfs-server-list/bootstrap"));
const array_hyper_unique_1 = require("array-hyper-unique");
const ipfs_api_type_1 = (0, tslib_1.__importDefault)(require("ipfs-api-type"));
async function configOthers(ipfs) {
    const wss = '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star';
    const bs = (0, array_hyper_unique_1.array_unique)(bootstrap_1.default);
    const apiType = await (0, ipfs_api_type_1.default)(ipfs);
    return (0, setConfigIfNotExists_1.setConfigIfNotExistsLazy)(ipfs, [
        ['Discovery.MDNS.Enabled', true],
        ['Discovery.webRTCStar.Enabled', true],
        /*
        [
            'Addresses.Swarm', async (oldValue: string[], key, ipfs: IIPFSPromiseApi) =>
        {
            if (apiType === 'js')
            {
                oldValue = oldValue ?? [];

                if (!oldValue.includes(wss))
                {
                    oldValue.push(wss)
                }
            }
            else
            {
                return Promise.reject(oldValue)
            }

            return oldValue
        },
            {
                filter(oldValue: string[])
                {
                    return !oldValue?.includes(wss)
                },
            }
        ],
         */
        [
            'Bootstrap', (oldValue) => {
                oldValue = oldValue !== null && oldValue !== void 0 ? oldValue : [];
                bs.forEach(addr => {
                    if (!oldValue.includes(addr)) {
                        if (apiType !== 'js' && addr.includes('/wss/')) {
                            return;
                        }
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
                'PUT',
                'GET',
                'POST',
                'OPTIONS',
            ]],
        ['Gateway.HTTPHeaders.Access-Control-Allow-Origin', [
                'https://webui.ipfs.io',
                'https://dev.webui.ipfs.io/',
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