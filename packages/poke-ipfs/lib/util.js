"use strict";
/**
 * Created by user on 2020/4/3.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsURL = exports.notAllowCors = exports.isLocalNetwork = exports.isLocalHost = void 0;
/**
 * Addresses reserved for private networks
 * @see {@link https://en.wikipedia.org/wiki/Private_network}
 *
 * https://github.com/tinovyatkin/is-localhost-ip/blob/master/index.js
 */
const IP_RANGES = [
    // 10.0.0.0 - 10.255.255.255
    /^(:{2}f{4}:)?10(?:\.\d{1,3}){3}$/,
    // 127.0.0.0 - 127.255.255.255
    /^(:{2}f{4}:)?127(?:\.\d{1,3}){3}$/,
    // 169.254.1.0 - 169.254.254.255
    /^(::f{4}:)?169\.254\.([1-9]|1?\d\d|2[0-4]\d|25[0-4])\.\d{1,3}$/,
    // 172.16.0.0 - 172.31.255.255
    /^(:{2}f{4}:)?(172\.1[6-9]|172\.2\d|172\.3[01])(?:\.\d{1,3}){2}$/,
    // 192.168.0.0 - 192.168.255.255
    /^(:{2}f{4}:)?192\.168(?:\.\d{1,3}){2}$/,
    // fc00::/7
    /^f[cd][\da-f]{2}(::1$|:[\da-f]{1,4}){1,7}$/,
    // fe80::/10
    /^fe[89ab][\da-f](::1$|:[\da-f]{1,4}){1,7}$/,
];
// Concat all RegExes from above into one
const IP_TESTER_RE = new RegExp(`^(${IP_RANGES.map(re => re.source).join('|')})$`);
function isLocalHost(url) {
    if (typeof url === 'string') {
        url = new URL(url.toString());
    }
    return [
        'localhost',
        '127.0.0.1',
        '::',
        '::1',
    ].includes(url.hostname);
}
exports.isLocalHost = isLocalHost;
function isLocalNetwork(url) {
    if (typeof url === 'string') {
        url = new URL(url.toString());
    }
    return IP_TESTER_RE.test(url.hostname);
}
exports.isLocalNetwork = isLocalNetwork;
function notAllowCors(url) {
    if (typeof url === 'string') {
        url = new URL(url.toString());
    }
    return isLocalHost(url) || isLocalNetwork(url) || url.protocol === 'ipfs:';
}
exports.notAllowCors = notAllowCors;
function corsURL(url, cors) {
    let protocol = 'https:';
    if (typeof url === 'string') {
        url = new URL(url.toString());
    }
    if (cors !== false && notAllowCors(url)) {
        cors = false;
    }
    if (cors !== false && typeof window !== 'undefined') {
        cors = cors !== null && cors !== void 0 ? cors : window.location.host === url.host;
        protocol = window.location.protocol || protocol;
    }
    if (cors === true) {
        return new URL(`${protocol}//cors-anywhere.herokuapp.com/${url.toString()}`);
    }
    return url;
}
exports.corsURL = corsURL;
//# sourceMappingURL=util.js.map