"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const util_1 = require("../util");
async function version(ipfs) {
    return (0, util_1.runSubCheck)(async () => {
        let data = await ipfs.version();
        return !!data.version;
    });
}
exports.version = version;
exports.default = version;
//# sourceMappingURL=version.js.map