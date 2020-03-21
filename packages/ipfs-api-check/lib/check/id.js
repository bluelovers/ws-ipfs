"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
const util_1 = require("../util");
async function id(ipfs) {
    return util_1.runSubCheck(async () => {
        let data = await ipfs.id();
        return !!data.id;
    });
}
exports.id = id;
exports.default = id;
//# sourceMappingURL=id.js.map