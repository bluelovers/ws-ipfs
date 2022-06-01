"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDefaultOptions = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const EXPERIMENTAL_1 = tslib_1.__importDefault(require("./EXPERIMENTAL"));
function mergeDefaultOptions(options = {}) {
    return (0, lodash_1.merge)({
        EXPERIMENTAL: (0, EXPERIMENTAL_1.default)(),
        relay: {
            enabled: true,
            hop: {
                enabled: true,
                active: true,
            },
            Pubsub: {
                Enabled: true,
            },
        },
        repoAutoMigrate: true,
        migrate: true,
    }, (0, lodash_1.defaultsDeep)(options, {}));
}
exports.mergeDefaultOptions = mergeDefaultOptions;
exports.default = mergeDefaultOptions;
//# sourceMappingURL=options.js.map