"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDefaultAll = void 0;
const pubsub_1 = __importDefault(require("./pubsub"));
const cors_1 = __importDefault(require("./cors"));
const swarm_1 = __importDefault(require("./swarm"));
async function configDefaultAll(ipfs, skipCheck) {
    /**
     * skip all config if can't pass
     * @type {boolean}
     */
    let skip;
    if (skipCheck !== true) {
        skip = await ipfs.config.get('Addresses.API')
            .then(e => false)
            .catch(e => true);
    }
    if (skip) {
        return null;
    }
    const ls = [];
    const fns = [
        pubsub_1.default,
        cors_1.default,
        swarm_1.default,
    ];
    for (const fn of fns) {
        const bools = await fn(ipfs);
        ls.push(bools);
    }
    return ls;
}
exports.configDefaultAll = configDefaultAll;
exports.default = configDefaultAll;
//# sourceMappingURL=default.js.map