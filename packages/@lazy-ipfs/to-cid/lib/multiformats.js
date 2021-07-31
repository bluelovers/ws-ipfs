"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMultiformatsCID = void 0;
const tslib_1 = require("tslib");
const err_code_1 = (0, tslib_1.__importDefault)(require("err-code"));
const multiformats_1 = require("multiformats");
const js_cids_1 = require("@lazy-ipfs/detect-cid-lib/lib/js-cids");
const js_multiformats_1 = require("@lazy-ipfs/detect-cid-lib/lib/js-multiformats");
const util_1 = require("@lazy-ipfs/detect-cid-lib/lib/util");
const parsePath_1 = require("@lazy-ipfs/parse-ipfs-path/lib/parsePath");
const _handleLibCID_1 = require("./_handleLibCID");
const util_2 = require("@lazy-ipfs/parse-ipfs-path/lib/util");
const _handleFromURL_1 = require("@lazy-ipfs/parse-ipfs-path/lib/_handleFromURL");
const index_1 = require("@lazy-ipfs/is-cid/index");
function toMultiformatsCID(cidInput, libCID) {
    var _a;
    libCID = (0, _handleLibCID_1._handleLibCID)(libCID, multiformats_1.CID);
    if (typeof cidInput === 'string' || cidInput instanceof URL) {
        // @ts-ignore
        cidInput = (0, index_1._url_href)(cidInput);
        let ret;
        if (!(0, index_1._if_path_can_be_cid)(cidInput)) {
            if ((ret = (0, _handleFromURL_1._handleFromURL)(cidInput))) {
                cidInput = (_a = ret.hash) !== null && _a !== void 0 ? _a : ret;
                if ((0, index_1._if_path_can_be_cid)(cidInput)) {
                    cidInput = (0, index_1._remove_path_prefix)(cidInput);
                }
            }
            if (/[\/]/.test(cidInput)) {
                cidInput = (0, parsePath_1.parsePath)(cidInput, {
                    unsafeReturn: true,
                    noThrow: true,
                }).hash;
            }
        }
        if ((0, index_1._if_path_can_be_cid)(cidInput)) {
            cidInput = (0, index_1._remove_path_prefix)(cidInput);
        }
        return libCID.parse(cidInput);
    }
    else if ((0, util_1._isArrayLike)(cidInput)) {
        return libCID.decode(cidInput);
    }
    let cid = libCID.asCID(cidInput);
    if ((typeof cid === 'undefined' || cid === null)) {
        if ((0, js_cids_1.isRawJsCIDLike)(cidInput)) {
            cid = libCID.asCID((0, js_cids_1.toRawJsCIDFake)(cidInput));
        }
        else if ((0, js_multiformats_1.isRawMultiformatsCIDLike)(cidInput)) {
            cid = libCID.asCID((0, js_multiformats_1.toRawMultiformatsCIDFake)(cidInput));
        }
        else if ((0, util_2.isParsePathResultLoose)(cidInput)) {
            cid = toMultiformatsCID(cidInput.hash);
        }
    }
    if (!cid) {
        throw (0, err_code_1.default)(new TypeError(`Invalid type for convert to MultiformatsCID: ${cidInput}`), {
            input: cidInput,
        });
    }
    return cid;
}
exports.toMultiformatsCID = toMultiformatsCID;
exports.default = toMultiformatsCID;
//# sourceMappingURL=multiformats.js.map