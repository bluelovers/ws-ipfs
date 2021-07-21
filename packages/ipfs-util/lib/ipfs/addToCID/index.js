"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSourceToTarget = exports.addSourceToTargetCore = void 0;
/**
 * https://discuss.ipfs.io/t/how-can-attach-cid-to-new-node/7534/5
 */
function addSourceToTargetCore(source, target, ipfs) {
    var _a, _b;
    return ipfs.object.patch.addLink(target.cid, {
        // @ts-ignore
        name: (_a = source.Name) !== null && _a !== void 0 ? _a : source.name,
        // @ts-ignore
        cid: (_b = source.Hash) !== null && _b !== void 0 ? _b : source.cid,
    });
}
exports.addSourceToTargetCore = addSourceToTargetCore;
async function addSourceToTarget(source, target, ipfs) {
    if (Array.isArray(source)) {
        let cid = target.cid;
        for await (const entry of source) {
            cid = await addSourceToTargetCore(entry, {
                cid,
            }, ipfs);
        }
        return cid;
    }
    else {
        return addSourceToTargetCore(source, target, ipfs);
    }
}
exports.addSourceToTarget = addSourceToTarget;
exports.default = addSourceToTarget;
//# sourceMappingURL=index.js.map