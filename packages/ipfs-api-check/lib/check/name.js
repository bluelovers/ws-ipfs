"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
const util_1 = require("../util");
async function name(ipfs) {
    let publish = await (0, util_1.runSubCheck)(async () => {
        const addr = '/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
        const res = await ipfs.name.publish(addr, {
            timeout: 5000,
        });
        return res.name && res.value === addr;
    });
    let cancel = await (0, util_1.runSubCheck)(async () => {
        const name = 'QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm';
        const result = await ipfs.name.pubsub.cancel(name);
        return typeof result.canceled === 'boolean';
    });
    let state = await (0, util_1.runSubCheck)(async () => {
        const name = 'QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm';
        const result = await ipfs.name.pubsub.state();
        //console.dir(result);
        return typeof result.enabled === 'boolean';
    });
    let subs = await (0, util_1.runSubCheck)(async () => {
        const name = 'QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm';
        const result = await ipfs.name.pubsub.subs();
        //console.dir(result);
        return typeof result.length === 'number';
    });
    let resolve = await (0, util_1.runSubCheck)(async () => {
        const addr = '/ipns/ipfs.io';
        for await (const name of ipfs.name.resolve(addr)) {
            //console.log(name)
            // /ipfs/QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm
            return typeof name === 'string';
        }
    });
    return {
        publish,
        pubsub: {
            cancel,
            state,
            subs,
        },
        resolve,
    };
}
exports.name = name;
exports.default = name;
//# sourceMappingURL=name.js.map