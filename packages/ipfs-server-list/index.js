"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsServerList = exports.getIpfsServerList = void 0;
function getIpfsServerList() {
    let data = {
        /**
         * http://blog.hubwiz.com/2019/09/11/infura-dev-manual/
         * http://cw.hubwiz.com/card/c/infura-api/1/4/3/
         * https://github.com/Pedro-vk/ipfs-website-deployer/blob/master/src/ipfs-website-deployer-cli.ts
         * https://infura.io/docs/ipfs/get/version
         */
        'infura.io': {
            API: {
                port: 5001,
                host: 'ipfs.infura.io',
                protocol: 'https',
            },
            Gateway: 'https://ipfs.infura.io/ipfs/',
            limit: {
                ref: false,
                id: false,
                config: false,
                ls: false,
            },
        },
        /**
         * https://developers.cloudflare.com/distributed-web/ipfs-gateway/
         */
        'cloudflare': {
            Gateway: 'https://cloudflare-ipfs.com/ipfs/',
        },
        'ipfs': {
            Gateway: 'https://ipfs.io/ipfs/',
            IPLD: 'https://explore.ipld.io/#/explore/',
            IPNS: 'https://ipfs.io/ipns/',
        },
    };
    data;
    return data;
}
exports.getIpfsServerList = getIpfsServerList;
exports.ipfsServerList = getIpfsServerList();
exports.default = exports.ipfsServerList;
//# sourceMappingURL=index.js.map