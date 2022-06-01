"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertCheckIPFS = exports.checkIPFS = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const lazy_aggregate_error_1 = require("lazy-aggregate-error");
const err_code_1 = tslib_1.__importDefault(require("err-code"));
function checkIPFS(ipfs) {
    return assertCheckIPFS(ipfs)
        .catch(() => null);
}
exports.checkIPFS = checkIPFS;
function assertCheckIPFS(ipfs) {
    let _error;
    return bluebird_1.default.resolve(ipfs)
        .then(async (ipfs) => {
        var _a, _b;
        let bool;
        const timeout = 2000;
        bool = await ipfs
            .version({
            timeout,
        })
            .then(v => !!v)
            .catch(e => {
            _error !== null && _error !== void 0 ? _error : (_error = new lazy_aggregate_error_1.AggregateErrorExtra());
            _error.push(e);
            return null;
        });
        if (!bool) {
            bool = await ipfs
                .id({
                timeout,
            })
                .then(v => !!v)
                .catch(e => {
                _error !== null && _error !== void 0 ? _error : (_error = new lazy_aggregate_error_1.AggregateErrorExtra());
                _error.push(e);
                return null;
            });
        }
        if (!bool) {
            let e = (0, err_code_1.default)(new Error('Invalid ipfs'), {
                endpointConfig: (_b = (_a = ipfs).getEndpointConfig) === null || _b === void 0 ? void 0 : _b.call(_a),
            });
            _error !== null && _error !== void 0 ? _error : (_error = new lazy_aggregate_error_1.AggregateErrorExtra());
            _error.push(e);
            throw _error;
        }
        return bool;
    })
        .catch(e => {
        if (!(e instanceof lazy_aggregate_error_1.AggregateErrorExtra)) {
            _error !== null && _error !== void 0 ? _error : (_error = new lazy_aggregate_error_1.AggregateErrorExtra());
            _error.push(e);
        }
        else {
            _error = e;
        }
        return Promise.reject(_error);
    });
}
exports.assertCheckIPFS = assertCheckIPFS;
//# sourceMappingURL=index.js.map