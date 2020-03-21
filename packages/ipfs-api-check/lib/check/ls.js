"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ls = void 0;
const util_1 = require("../util");
async function ls(ipfs) {
    const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF';
    return util_1.runSubCheck(async () => {
        for await (const file of ipfs.ls(cid)) {
            if (file.path === 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF/cat.gif') {
                return true;
            }
        }
    });
}
exports.ls = ls;
exports.default = ls;
//# sourceMappingURL=ls.js.map