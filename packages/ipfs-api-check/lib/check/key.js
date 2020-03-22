"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.key = void 0;
const util_1 = require("../util");
async function key(ipfs) {
    const name = 'my-key';
    const name_new = name + '_new';
    let gen = await util_1.runSubCheck(async () => {
        const result = await ipfs.key.gen(name, {
            type: 'rsa',
            size: 2048,
        });
        //console.dir(result)
        return result.name === name;
    });
    let list = await util_1.runSubCheck(async () => {
        const result = await ipfs.key.list();
        //console.dir(result)
        return typeof result.length === 'number';
    });
    let rm = await util_1.runSubCheck(async () => {
        const result = await ipfs.key.rm(name);
        //console.dir(result)
        return result.name === name;
    });
    let rename = await util_1.runSubCheck(async () => {
        const result = await ipfs.key.rename(name, name_new);
        //console.dir(result)
        return result.was === name
            && result.now === name_new;
    });
    let keyExport = await util_1.runSubCheck(async () => {
        const result = await ipfs.key.export(name, name_new);
        //console.dir(result)
        return result.length;
    });
    let keyImport = await util_1.runSubCheck(async () => {
        const result = await ipfs.key.import('clone', 'password');
        //console.dir(result)
        return result.name === 'clone';
    });
    return {
        gen,
        list,
        rm,
        rename,
        export: keyExport,
        import: keyImport,
    };
}
exports.key = key;
exports.default = key;
//# sourceMappingURL=key.js.map