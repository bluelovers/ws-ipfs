"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDefaultOptions = void 0;
const lodash_1 = require("lodash");
const EXPERIMENTAL_1 = __importDefault(require("./EXPERIMENTAL"));
function mergeDefaultOptions(options = {}) {
    return lodash_1.merge({
        EXPERIMENTAL: EXPERIMENTAL_1.default(),
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
    }, lodash_1.defaultsDeep(options, {}));
}
exports.mergeDefaultOptions = mergeDefaultOptions;
exports.default = mergeDefaultOptions;
//# sourceMappingURL=options.js.map