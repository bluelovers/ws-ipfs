"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strToCidToStr = exports.resultToPath = exports.parsePath = exports.EnumParsePathResultNs = void 0;
const tslib_1 = require("tslib");
const is_valid_domain_1 = (0, tslib_1.__importDefault)(require("is-valid-domain"));
const to_cid_1 = require("@lazy-ipfs/to-cid");
var EnumParsePathResultNs;
(function (EnumParsePathResultNs) {
    EnumParsePathResultNs["ipfs"] = "ipfs";
    EnumParsePathResultNs["ipns"] = "ipns";
})(EnumParsePathResultNs = exports.EnumParsePathResultNs || (exports.EnumParsePathResultNs = {}));
/**
 * @see https://github.com/tableflip/dweb-path
 */
function parsePath(input) {
    let ns, hash, path;
    if (Buffer.isBuffer(input) || (0, to_cid_1.isCID)(input)) {
        hash = (0, to_cid_1.toCID)(input).toBaseEncodedString();
        ns = "ipfs" /* ipfs */;
        path = '';
    }
    else if (typeof input === 'string' || Object.prototype.toString.call(input) === '[object String]') {
        // Ensure leading slash
        if (input[0] !== '/') {
            input = `/${input}`;
        }
        // Remove trailing slash
        if (input[input.length - 1] === '/') {
            input = input.slice(0, -1);
        }
        const parts = input.split('/');
        if (parts[1] === "ipfs" /* ipfs */ || parts[1] === "ipns" /* ipns */) {
            try {
                hash = strToCidToStr(parts[2]);
            }
            catch (err) {
                // If IPNS then this could be a domain name
                if (parts[1] === "ipns" /* ipns */ && (0, is_valid_domain_1.default)(parts[2])) {
                    hash = parts[2];
                }
                else {
                    throw err;
                }
            }
            ns = parts[1];
            path = parts.slice(3).join('/');
        }
        else {
            // Is parts[1] a CID?
            try {
                hash = strToCidToStr(parts[1]);
            }
            catch (err) {
                throw new Error(`Unknown namespace: ${parts[1]}`);
            }
            ns = "ipfs" /* ipfs */;
            path = parts.slice(2).join('/');
        }
        // Ensure leading slash on non empty path
        if (path.length) {
            path = `/${path}`;
        }
    }
    else {
        throw new Error('Invalid path'); // What even is this?
    }
    const toString = () => `/${ns}/${hash}${path}`;
    return Object.defineProperties({}, {
        ns: { value: ns, enumerable: true },
        hash: { value: hash, enumerable: true },
        path: { value: path, enumerable: true },
        toString: { value: toString },
        toJSON: { value: toString },
    });
}
exports.parsePath = parsePath;
function resultToPath(result) {
    return `/${result.ns}/${result.hash}${result.path}`;
}
exports.resultToPath = resultToPath;
function strToCidToStr(str) {
    return (0, to_cid_1.toCID)(str).toString();
}
exports.strToCidToStr = strToCidToStr;
//# sourceMappingURL=parsePath.js.map