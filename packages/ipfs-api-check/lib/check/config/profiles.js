"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profiles = void 0;
const util_1 = require("../../util");
async function profiles(ipfs) {
    let list = await (0, util_1.runSubCheck)(async () => {
        const profiles = await ipfs.config.profiles.list();
        return profiles;
    });
    let apply = await (0, util_1.runSubCheck)(async () => {
        const diff = await ipfs.config.profiles.apply('lowpower', {
            dryRun: true,
        });
        return diff.original && diff.updated;
    });
    return {
        list,
        apply,
    };
}
exports.profiles = profiles;
exports.default = profiles;
//# sourceMappingURL=profiles.js.map