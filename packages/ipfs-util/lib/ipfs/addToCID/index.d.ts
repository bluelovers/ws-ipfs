import { ICIDValue, ICIDObject } from '@lazy-ipfs/to-cid';
import { IIPFSPromiseApi } from 'ipfs-types';
import { ITSValueOrArray } from 'ts-type';
import CID from 'cids';
/**
 * https://discuss.ipfs.io/t/how-can-attach-cid-to-new-node/7534/5
 */
export declare function addSourceToTargetCore(source: {
    cid: ICIDValue;
    name: string;
}, target: {
    cid: ICIDValue;
}, ipfs: IIPFSPromiseApi): Promise<CID>;
export declare function addSourceToTarget(source: ITSValueOrArray<{
    cid: ICIDValue;
    name: string;
}>, target: {
    cid: ICIDValue;
}, ipfs: IIPFSPromiseApi): Promise<ICIDObject>;
export default addSourceToTarget;
