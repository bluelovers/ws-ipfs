"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pin = void 0;
const util_1 = require("../util");
async function pin(ipfs) {
    let add = await util_1.runSubCheck(async () => {
        const pinset = await ipfs.pin.add('QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u');
        return pinset.length && pinset[0].cid;
    });
    return {
        add,
    };
}
exports.pin = pin;
exports.default = pin;
//# sourceMappingURL=pin.js.map