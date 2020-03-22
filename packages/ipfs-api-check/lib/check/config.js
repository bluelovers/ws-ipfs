"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const util_1 = require("../util");
const profiles_1 = __importDefault(require("./config/profiles"));
async function config(ipfs) {
    let get = await util_1.runSubCheck(async () => {
        const config = await ipfs.config.get('Addresses');
        return config;
    });
    return {
        get,
        profiles: await profiles_1.default(ipfs),
    };
}
exports.config = config;
exports.default = config;
//# sourceMappingURL=config.js.map