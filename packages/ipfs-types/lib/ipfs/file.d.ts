/// <reference types="node" />
import TypedArray = NodeJS.TypedArray;
import { IApiOptions } from '../options';
import BufferList from 'bl';
import { IMtime, IUnixTime, IAsyncIterableAbleOrValue, IAsyncIterableAble, ICIDObject, IDagHashAlg } from '../types';
export declare type IBytes = number[] | Buffer | ArrayBuffer | TypedArray;
export declare type IBloby = Blob | File;
export declare type IBufferList = BufferList;
export declare type IFileContent = IBytes | IBloby | string | Iterable<number> | IAsyncIterableAble<IBytes>;
export interface IFileObject {
    path?: string;
    content?: IFileContent;
    mode?: number | string;
    mtime?: IUnixTime;
}
export declare type IFileData = IAsyncIterableAbleOrValue<IFileObject> | IAsyncIterableAbleOrValue<IBloby> | IAsyncIterableAbleOrValue<IBytes> | IAsyncIterableAbleOrValue<string> | Iterable<number>;
export interface IIPFSFileApiAddOptions extends IApiOptions<{
    chunker?: string | 'size-262144' | 'rabin';
    cidVersion?: number;
    enableShardingExperiment?: any;
    hashAlg?: IDagHashAlg;
    onlyHash?: boolean;
    pin?: boolean;
    progress?: any;
    rawLeaves?: boolean;
    shardSplitThreshold?: number;
    trickle?: boolean;
    wrapWithDirectory?: boolean;
}> {
}
export interface IIPFSFileApiAddReturnEntry {
    path: string;
    cid: ICIDObject;
    mode: number;
    mtime: IMtime;
    size: number;
}
export interface IIPFSFileApi {
    add(data: IFileData, options?: IIPFSFileApiAddOptions): AsyncIterable<IIPFSFileApiAddReturnEntry>;
    cat(ipfsPath: any, options?: IApiOptions<{
        offset?: number;
        length?: number;
    }>): AsyncIterable<Buffer>;
    get(ipfsPath: any, options?: IApiOptions<{}>): AsyncIterable<{
        path: string;
        content: AsyncIterable<IBufferList>;
        mode: number;
        mtime: IMtime;
    }>;
    ls(ipfsPath: any, options?: IApiOptions<{}>): AsyncIterable<{
        depth: number;
        name: string;
        path: string;
        size: number;
        cid: ICIDObject;
        type: 'file' | string;
        mode: number;
        mtime: IMtime;
    }>;
}
