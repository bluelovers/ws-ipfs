"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixIPFSAddressesSwarmWss = void 0;
async function fixIPFSAddressesSwarmWss(argv) {
    const { error, ipfs } = argv;
    if (error) {
        if (error.code === 'ERR_WEBSOCKET_STAR_SWARM_ADDR_NOT_SUPPORTED') {
            // @ts-ignore
            await ipfs.stop();
            let swarm = await ipfs.config.get('Addresses.Swarm');
            const wss = '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star';
            if (swarm.includes(wss)) {
                swarm = swarm.filter(v => v !== wss);
                await ipfs.config.set('Addresses.Swarm', swarm);
                // @ts-ignore
                return ipfs.start();
            }
        }
        return Promise.reject(error);
    }
    return ipfs;
}
exports.fixIPFSAddressesSwarmWss = fixIPFSAddressesSwarmWss;
//# sourceMappingURL=wss.js.map