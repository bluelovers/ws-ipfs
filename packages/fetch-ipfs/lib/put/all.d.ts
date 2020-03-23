/// <reference lib="es2020" />
import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import Bluebird from 'bluebird';
import { IIPFSFileApi, IFileData, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { ITSValueOrArray } from 'ts-type';
import { INetworkOptionsBase } from 'ipfs-types/lib/options';
export interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}
export interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}
export declare type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;
export declare function publishToIPFSAll(data: IFileData, useIPFS: ITSValueOrArray<string | IIPFSPromiseApi | IIPFSClientAddresses | Pick<IIPFSFileApi, 'add'>>, options?: {
    addOptions?: IIPFSFileApiAddOptions;
} & INetworkOptionsBase): Bluebird<PromiseSettledResult<IIPFSFileApiAddReturnEntry[]>[]>;
