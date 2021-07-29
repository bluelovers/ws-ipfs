import { IIPFSPromiseApi } from 'ipfs-types';
import { ITSValueOrArray } from 'ts-type';
import { ICIDValue, ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
/**
 * https://discuss.ipfs.io/t/how-can-attach-cid-to-new-node/7534/5
 */
export declare function addSourceToTargetCore(source: {
    cid: ICIDValue;
    name: string;
}, target: {
    cid: ICIDValue;
}, ipfs: IIPFSPromiseApi): Promise<import("cids")>;
export declare function addSourceToTarget(source: ITSValueOrArray<{
    cid: ICIDValue;
    name: string;
}>, target: {
    cid: ICIDValue;
}, ipfs: IIPFSPromiseApi): Promise<ICIDObject>;
export default addSourceToTarget;
