"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsServerList = exports.filterList = exports.getIpfsLocalList = exports.getIpfsServerList = void 0;
function getIpfsServerList() {
    let data = {
        'ipfs': {
            Gateway: 'https://ipfs.io/ipfs/',
            IPLD: 'https://explore.ipld.io/#/explore/',
            IPNS: 'https://ipfs.io/ipns/',
        },
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
            GatewayDomain: '.cf-ipfs.com',
        },
        'ipfs.gateway': {
            Gateway: 'https://gateway.ipfs.io/ipfs/',
        },
        'bdaily': {
            Gateway: 'https://gateway.bdaily.club/ipfs/',
        },
    };
    data;
    return data;
}
exports.getIpfsServerList = getIpfsServerList;
function getIpfsLocalList() {
    let data = {
        'go-ipfs': {
            API: {
                port: 5001,
            },
        },
        'js-ipfs': {
            API: {
                port: 5002,
            },
        },
    };
    data;
    return data;
}
exports.getIpfsLocalList = getIpfsLocalList;
function filterList(key, serverList = exports.ipfsServerList) {
    return Object.keys(serverList)
        .reduce((a, b) => {
        if (serverList[b][key] != null) {
            a.push(serverList[b][key]);
        }
        return a;
    }, []);
}
exports.filterList = filterList;
exports.ipfsServerList = getIpfsServerList();
exports.default = exports.ipfsServerList;
//# sourceMappingURL=index.js.map