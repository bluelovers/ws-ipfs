"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSourceToTarget = exports.addSourceToTargetCore = void 0;
/**
 * https://discuss.ipfs.io/t/how-can-attach-cid-to-new-node/7534/5
 */
function addSourceToTargetCore(source, target, ipfs) {
    return ipfs.object.patch.addLink(target.cid, {
        name: source.name,
        cid: source.cid,
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