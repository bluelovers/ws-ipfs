"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const util_1 = require("../util");
const profiles_1 = (0, tslib_1.__importDefault)(require("./config/profiles"));
async function config(ipfs) {
    let get = await (0, util_1.runSubCheck)(async () => {
        const config = await ipfs.config.get('Addresses');
        return config;
    });
    return {
        get,
        profiles: await (0, profiles_1.default)(ipfs),
    };
}
exports.config = config;
exports.default = config;
//# sourceMappingURL=config.js.map