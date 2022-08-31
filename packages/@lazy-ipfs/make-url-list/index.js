"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._notAllowedAddress = exports.lazyMakeIpfsAllServerURL = exports.makeShareIpfsURL = exports.makeIpfsGatewayDomainURLList = exports.makeIpfsGatewayURLList = exports.makeIpfsGatewayAddressesURLAsync = void 0;
const ipfs_server_list_1 = require("ipfs-server-list");
const to_ipfs_url_1 = require("to-ipfs-url");
const ipfs_subdomain_1 = require("@lazy-ipfs/ipfs-subdomain");
const parsePath_1 = require("@lazy-ipfs/parse-ipfs-path/lib/parsePath");
const array_hyper_unique_1 = require("array-hyper-unique");
const lazy_url_1 = require("lazy-url");
const ipfs_api_url_1 = require("@lazy-ipfs/ipfs-api-url");
function makeIpfsGatewayAddressesURLAsync(cid, options) {
    return (0, ipfs_api_url_1.ipfsGatewayAddressesLink)(options.ipfs)
        .then(gateway => (0, to_ipfs_url_1.toURL)(cid, {
        ...options === null || options === void 0 ? void 0 : options.handleOptions,
        prefix: {
            ipfs: gateway,
        },
    }));
}
exports.makeIpfsGatewayAddressesURLAsync = makeIpfsGatewayAddressesURLAsync;
function makeIpfsGatewayURLList(cid, options) {
    var _a, _b;
    return ((_b = (_a = options === null || options === void 0 ? void 0 : options.ipfsGatewayList) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.serverList) !== null && _b !== void 0 ? _b : (0, ipfs_server_list_1.filterList)('Gateway')).map(gateway => {
        return (0, to_ipfs_url_1.toURL)(cid, {
            ...options === null || options === void 0 ? void 0 : options.handleOptions,
            prefix: {
                ipfs: gateway,
            },
        });
    });
}
exports.makeIpfsGatewayURLList = makeIpfsGatewayURLList;
function makeIpfsGatewayDomainURLList(cid, options) {
    var _a, _b;
    const data = (0, parsePath_1.parsePath)(cid, {
        noThrow: true,
        unsafeReturn: true,
    });
    return ((_b = (_a = options === null || options === void 0 ? void 0 : options.ipfsGatewayDomainList) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.serverList) !== null && _b !== void 0 ? _b : (0, ipfs_server_list_1.filterList)('GatewayDomain')).map(gateway => {
        try {
            return (0, ipfs_subdomain_1.ipfsSubdomainURL2)(data, gateway, options === null || options === void 0 ? void 0 : options.handleOptions);
        }
        catch (e) {
        }
    }).filter(Boolean);
}
exports.makeIpfsGatewayDomainURLList = makeIpfsGatewayDomainURLList;
function makeShareIpfsURL(cid, server) {
    const data = (0, parsePath_1.parsePath)(cid, {
        noThrow: true,
        unsafeReturn: true,
    });
    return new lazy_url_1.LazyURL(`${server !== null && server !== void 0 ? server : 'https://share.ipfs.io'}/#/${data.hash}`);
}
exports.makeShareIpfsURL = makeShareIpfsURL;
function lazyMakeIpfsAllServerURL(cid, options) {
    var _a, _b;
    options !== null && options !== void 0 ? options : (options = {});
    let list = [];
    if ((_a = options.serverList) === null || _a === void 0 ? void 0 : _a.length) {
        list.push(...(_b = options.serverList.map(gateway => {
            return (0, to_ipfs_url_1.toURL)(cid, {
                ...options.handleOptions,
                prefix: {
                    ipfs: gateway,
                },
            });
        })) !== null && _b !== void 0 ? _b : []);
    }
    list.push(...makeIpfsGatewayURLList(cid, {
        ...options,
        serverList: options.ipfsGatewayList,
    }));
    list.push(...makeIpfsGatewayDomainURLList(cid, {
        ...options,
        serverList: options.ipfsGatewayDomainList,
    }));
    //console.dir(list)
    return (0, array_hyper_unique_1.array_unique_overwrite)(list.filter(v => typeof v !== 'symbol' && v));
}
exports.lazyMakeIpfsAllServerURL = lazyMakeIpfsAllServerURL;
function _notAllowedAddress(url) {
    if (typeof url === 'string') {
        url = new lazy_url_1.LazyURL(url.toString());
    }
    return url.protocol === 'ipfs:' || [
        'localhost',
        '127.0.0.1',
        '::',
        '::1',
    ].includes(url.hostname);
}
exports._notAllowedAddress = _notAllowedAddress;
exports.default = lazyMakeIpfsAllServerURL;
//# sourceMappingURL=index.js.map