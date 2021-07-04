"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dag = void 0;
const util_1 = require("../util");
async function dag(ipfs) {
    const obj = {
        a: 1,
        b: [1, 2, 3],
        c: {
            ca: [5, 6, 7],
            cb: 'foo',
        },
    };
    const expected = 'bafyriqh7xeacdjivmpfzvskv3mxzok3mrlbqgbmorbmyaypnilifgpd3fexfrrfy4pcfzkm2ypnr2v5bpscv7aqchw6kebavald4mqp2wgrne';
    const put = await (0, util_1.runSubCheck)(async () => {
        const cid = await ipfs.dag.put(obj, { format: 'dag-cbor', hashAlg: 'sha3-512', timeout: 5000 });
        //console.log(cid.toString())
        return cid.toString() === expected;
    });
    const get = await (0, util_1.runSubCheck)(async () => {
        let r1 = await getValue(`${expected}/a`);
        let r2 = await getValue(`${expected}/b`);
        let r3 = await getValue(`${expected}/c`);
        let r4 = await getValue(`${expected}/c/ca/1`);
        return obj.a === r1
            && r2.length === obj.b.length
            && r3.cb === obj.c.cb
            && r4 === obj.c.ca[1];
    });
    const tree = await (0, util_1.runSubCheck)(async () => {
        const result = await ipfs.dag.tree(expected, void 0, {
            timeout: 5000,
        });
        //console.dir(result);
        return result.length;
    });
    const resolve = await (0, util_1.runSubCheck)(async () => {
        const result = await ipfs.dag.resolve(expected, void 0, {
            timeout: 5000,
        });
        //console.dir(result)
        return result.cid;
    });
    async function getValue(cidPath) {
        const result = await ipfs.dag.get(cidPath, void 0, {
            timeout: 5000,
        });
        return result.value;
    }
    return {
        put,
        get,
        tree,
        resolve,
    };
}
exports.dag = dag;
exports.default = dag;
//# sourceMappingURL=dag.js.map