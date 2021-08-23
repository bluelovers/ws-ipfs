import { IIPFSPromiseApi } from 'ipfs-types';
import { ITSValueOrArray } from 'ts-type';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { CID as MultiformatsCID } from 'multiformats';
/**
 * https://discuss.ipfs.io/t/how-can-attach-cid-to-new-node/7534/5
 */
export declare function addSourceToTargetCore(source: {
    cid: ICIDValue;
    name: string;
}, target: {
    cid: ICIDValue;
}, ipfs: IIPFSPromiseApi): Promise<MultiformatsCID>;
export declare function addSourceToTarget(source: ITSValueOrArray<{
    cid: ICIDValue;
    name: string;
}>, target: {
    cid: ICIDValue;
}, ipfs: IIPFSPromiseApi): Promise<MultiformatsCID>;
export default addSourceToTarget;
