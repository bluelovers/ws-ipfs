"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultToPath = exports.isParsePathResultLoose = exports.isParsePathResult = exports.assertToParsePathResult = exports.assertToParsePathResultPath = exports.assertToEnumNs = exports.parsePath = exports.parsePathCore = exports.EnumParsePathResultNs = exports.strToCidToStr = void 0;
const tslib_1 = require("tslib");
const is_valid_domain_1 = (0, tslib_1.__importDefault)(require("is-valid-domain"));
const to_cid_1 = require("@lazy-ipfs/to-cid");
Object.defineProperty(exports, "strToCidToStr", { enumerable: true, get: function () { return to_cid_1.strToCidToStr; } });
const util_1 = require("@lazy-ipfs/detect-cid-lib/lib/util");
const index_1 = (0, tslib_1.__importDefault)(require("@lazy-ipfs/cid-to-string/index"));
var EnumParsePathResultNs;
(function (EnumParsePathResultNs) {
    EnumParsePathResultNs["ipfs"] = "ipfs";
    EnumParsePathResultNs["ipns"] = "ipns";
})(EnumParsePathResultNs = exports.EnumParsePathResultNs || (exports.EnumParsePathResultNs = {}));
/**
 * @see https://github.com/tableflip/dweb-path
 */
function parsePathCore(input) {
    let ns, hash, path;
    if (Buffer.isBuffer(input) || (0, util_1._isArrayLike)(input) || (0, to_cid_1.isCID)(input)) {
        hash = (0, index_1.default)((0, to_cid_1.toCID)(input));
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
                hash = (0, to_cid_1.strToCidToStr)(parts[2]);
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
                hash = (0, to_cid_1.strToCidToStr)(parts[1]);
            }
            catch (err) {
                throw new TypeError(`Unknown namespace: ${parts[1]}`);
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
        throw new TypeError(`Invalid input: ${input}`); // What even is this?
    }
    return {
        ns,
        hash,
        path,
    };
}
exports.parsePathCore = parsePathCore;
function parsePath(input, options) {
    try {
        return parsePathCore(input);
    }
    catch (e) {
        if (!(options === null || options === void 0 ? void 0 : options.noThrow)) {
            throw e;
        }
    }
    if (options === null || options === void 0 ? void 0 : options.unsafeReturn) {
        return {
            ns: "ipfs" /* ipfs */,
            hash: input,
            path: '',
        };
    }
}
exports.parsePath = parsePath;
function assertToEnumNs(ns) {
    // @ts-ignore
    if (EnumParsePathResultNs[ns] !== ns) {
        throw new TypeError(`Invalid ns: ${ns}`);
    }
}
exports.assertToEnumNs = assertToEnumNs;
function assertToParsePathResultPath(path) {
    if (typeof path === 'string' && path.length) {
        if (path[0] !== '/' || path.length < 2) {
            throw new TypeError(`Invalid path: ${path}`);
        }
    }
    else if (path !== '' && typeof path !== 'undefined' && path !== null) {
        throw new TypeError(`Invalid path: ${path}`);
    }
}
exports.assertToParsePathResultPath = assertToParsePathResultPath;
function assertToParsePathResult(result) {
    assertToEnumNs(result.ns);
    if (result.ns !== "ipns" /* ipns */) {
        try {
            (0, to_cid_1.toCID)(result.hash);
        }
        catch (e) {
            throw new TypeError(`Invalid hash: ${result.hash}`);
        }
    }
    assertToParsePathResultPath(result.path);
}
exports.assertToParsePathResult = assertToParsePathResult;
function isParsePathResult(result) {
    try {
        assertToParsePathResult(result);
        return true;
    }
    catch (e) {
    }
    return false;
}
exports.isParsePathResult = isParsePathResult;
function isParsePathResultLoose(result) {
    // @ts-ignore
    return Boolean(result.ns && result.hash);
}
exports.isParsePathResultLoose = isParsePathResultLoose;
function resultToPath(result) {
    var _a;
    assertToParsePathResult(result);
    return `/${result.ns}/${result.hash}${(_a = result.path) !== null && _a !== void 0 ? _a : ''}`;
}
exports.resultToPath = resultToPath;
//# sourceMappingURL=parsePath.js.map