/**
 * Created by user on 2020/3/27.
 */
import { PromiseSettledResult } from '../types';
import { IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
export declare type IPublishToIPFSReturn = PromiseSettledResult<IIPFSFileApiAddReturnEntry[], {
    error: Error;
    value: IIPFSFileApiAddReturnEntry[];
}>[];
