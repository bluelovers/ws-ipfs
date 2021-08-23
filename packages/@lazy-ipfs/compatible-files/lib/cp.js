"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsFilesCopy = exports._ipfsFilesCopy = void 0;
const _getExtraOptions_1 = require("./util/_getExtraOptions");
const path_1 = require("path");
const _promise_1 = require("./util/_promise");
const mkdir_1 = require("./mkdir");
const stat_1 = require("./stat");
const rm_1 = require("./rm");
const _dummy_1 = require("./util/_dummy");
const index_1 = require("@lazy-ipfs/is-same-cid/index");
const lazy_aggregate_error_1 = require("lazy-aggregate-error");
const _promiseCatchAggregateError_1 = require("./util/_promiseCatchAggregateError");
/**
 * @see https://github.com/ipfs/js-ipfs/issues/3747
 */
async function _ipfsFilesCopy(ipfs, from, to, options) {
    if (options === null || options === void 0 ? void 0 : options.parents) {
        const dir_path = path_1.posix.dirname(to);
        if (dir_path.length && dir_path !== '/') {
            await (0, _promise_1._promiseIgnoreError)((0, mkdir_1.ipfsFilesMakeDirectory)(ipfs, dir_path, options));
        }
    }
    return ipfs.files.cp(from, to, options);
}
exports._ipfsFilesCopy = _ipfsFilesCopy;
async function ipfsFilesCopy(ipfs, from, to, options) {
    let extraOptions = (0, _getExtraOptions_1._getExtraOptions)(options);
    if (extraOptions.validCheck) {
        // @ts-ignore
        if (typeof from !== 'string' && typeof from.length === 'number') {
            throw new TypeError('Not support multiple cids when validCheck is enabled');
        }
    }
    const err = new lazy_aggregate_error_1.AggregateErrorExtra();
    if (extraOptions.overwrite) {
        await (0, _promise_1._promiseIgnoreError)((0, rm_1.ipfsFilesRemove)(ipfs, to), null, err);
    }
    let p = _ipfsFilesCopy(ipfs, from, to, options);
    if (extraOptions.validCheck) {
        extraOptions = {
            ...extraOptions,
            returnStat: true,
        };
        p = p.catch(e => {
            err.push(e);
            return (0, _dummy_1._dummyNull)();
        });
    }
    p = (0, stat_1._returnStat02)(p, ipfs, to, extraOptions);
    if (extraOptions.validCheck) {
        p = p.then(file_stat => {
            if (!file_stat || !(0, index_1.isSameCID)(file_stat.cid, from)) {
                return Promise.reject((0, index_1.newAssertionSameCIDError)(file_stat === null || file_stat === void 0 ? void 0 : file_stat.cid, from));
            }
            return file_stat;
        });
    }
    p = (0, _promiseCatchAggregateError_1._promiseCatchAggregateError)(p, err);
    return p;
}
exports.ipfsFilesCopy = ipfsFilesCopy;
//# sourceMappingURL=cp.js.map