"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePathCore = exports._parsePathCore = void 0;
const tslib_1 = require("tslib");
const _invalidInput_1 = require("./_invalidInput");
const err_code_1 = tslib_1.__importDefault(require("err-code"));
const util_1 = require("./util");
const _handleFromURL_1 = require("./_handleFromURL");
const to_cid_1 = require("@lazy-ipfs/to-cid");
const is_valid_domain_1 = tslib_1.__importDefault(require("is-valid-domain"));
const util_2 = require("@lazy-ipfs/detect-cid-lib/lib/util");
const cid_to_string_1 = tslib_1.__importDefault(require("@lazy-ipfs/cid-to-string"));
const asserts_1 = require("./asserts");
const is_cid_1 = require("@lazy-ipfs/is-cid");
/**
 * @see https://github.com/tableflip/dweb-path
 */
function _parsePathCore(input) {
    var _a;
    const originalInput = input;
    let ns, hash, path;
    if ((0, _invalidInput_1._invalidInput)(input)) {
        // dummy
    }
    else if (typeof input === 'string' || (0, util_1._isStringObject)(input) || input instanceof URL) {
        input = (0, is_cid_1._url_href)(input);
        // @ts-ignore
        input = (_a = (0, _handleFromURL_1._handleFromURL)(input)) !== null && _a !== void 0 ? _a : input;
        if (typeof input !== 'string') {
            return input;
        }
        // Ensure leading slash
        if (input[0] !== '/') {
            input = `/${input}`;
        }
        // Remove trailing slash
        if (input[input.length - 1] === '/') {
            input = input.slice(0, -1);
        }
        const parts = input.split('/');
        if (parts[1] === "ipfs" /* EnumParsePathResultNs.ipfs */ || parts[1] === "ipns" /* EnumParsePathResultNs.ipns */) {
            try {
                hash = (0, to_cid_1.strToCidToStr)(parts[2]);
            }
            catch (err) {
                // If IPNS then this could be a domain name
                if (parts[1] === "ipns" /* EnumParsePathResultNs.ipns */ && (0, is_valid_domain_1.default)(parts[2])) {
                    hash = parts[2];
                }
                else {
                    throw (0, err_code_1.default)(err, {
                        originalInput,
                        input,
                        parts,
                    });
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
                throw (0, err_code_1.default)(new TypeError(`Unknown namespace: ${parts[1]}`), {
                    originalInput,
                    input,
                    parts,
                });
            }
            ns = "ipfs" /* EnumParsePathResultNs.ipfs */;
            path = parts.slice(2).join('/');
        }
        // Ensure leading slash on non empty path
        if (path.length) {
            path = `/${path}`;
        }
    }
    else if ((0, util_1.isParsePathResultLoose)(input)) {
        (0, asserts_1.assertToParsePathResult)(input);
        return input;
    }
    else if (Buffer.isBuffer(input) || (0, util_2._isArrayLike)(input) || (0, to_cid_1.isCID)(input)) {
        hash = (0, cid_to_string_1.default)((0, to_cid_1.toCID)(input));
        ns = "ipfs" /* EnumParsePathResultNs.ipfs */;
        path = '';
    }
    if (!(ns === null || ns === void 0 ? void 0 : ns.length) || !(hash === null || hash === void 0 ? void 0 : hash.length)) {
        throw (0, err_code_1.default)(new TypeError(`Invalid input: ${input}`), {
            originalInput,
            input,
        });
    }
    (0, asserts_1.assertToParsePathResultPath)(path);
    return {
        ns,
        hash,
        path,
    };
}
exports._parsePathCore = _parsePathCore;
function parsePathCore(input) {
    try {
        const ret = _parsePathCore(input);
        (0, asserts_1.assertToParsePathResult)(ret);
        return ret;
    }
    catch (e) {
        throw (0, err_code_1.default)(e, {
            originalInput: input,
        });
    }
}
exports.parsePathCore = parsePathCore;
//# sourceMappingURL=parsePathCore.js.map