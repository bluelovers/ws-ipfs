import * as _allChecks from './lib';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import { ITSUnpackedPromiseLike } from 'ts-type';
export declare type IAllTopKeys = keyof typeof _allChecks;
export declare type ICheckAll = {
    [key in IAllTopKeys]: ITSUnpackedPromiseLike<ReturnType<typeof _allChecks[key]>>;
};
export declare function checkAll(ipfs: IIPFSPromiseApi): Promise<ICheckAll>;
export default checkAll;
