"use strict";
/**
 * Created by user on 2020/4/3.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsURL = void 0;
function corsURL(url, cors) {
    let protocol = 'https:';
    if (typeof url === 'string') {
        url = new URL(url.toString());
    }
    if (typeof window !== 'undefined') {
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