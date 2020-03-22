"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const util_1 = require("../util");
async function ping(ipfs) {
    return util_1.runSubCheck(async () => {
        const count = 3;
        const peerId = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
        for await (const res of ipfs.ping(peerId, {
            timeout: 5000,
            count,
        })) {
            if (res.time) {
                //console.log(`Pong received: time=${res.time} ms`)
            }
            else {
                //console.log(res.text)
            }
            return true;
        }
    });
}
exports.ping = ping;
exports.default = ping;
//# sourceMappingURL=ping.js.map