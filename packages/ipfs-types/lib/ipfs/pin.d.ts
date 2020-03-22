import { INetworkOptionsBase } from '../options';
import { ITSValueOrArray } from 'ts-type';
import { ICIDObject, ICIDValue } from '../types';
declare type IPinType = "recursive" | "direct" | "indirect";
export interface IIPFSPinApiCore {
    add(hash: any, options?: {
        recursive?: boolean;
    } & INetworkOptionsBase): Promise<{
        cid: ICIDObject;
    }[]>;
    ls(cid?: ITSValueOrArray<ICIDValue>, options?: {
        type?: IPinType;
    } & INetworkOptionsBase): AsyncIterable<{
        cid: ICIDObject;
        type: IPinType;
    }>;
    rm(hash: any, options?: {
        recursive?: boolean;
    } & INetworkOptionsBase): Promise<{
        cid: ICIDObject;
    }[]>;
}
export interface IIPFSPinApi {
    /**
     * https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/SPEC/PIN.md#pinadd
     */
    pin: IIPFSPinApiCore;
}
export {};
