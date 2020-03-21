/// <reference types="node" />
import TypedArray = NodeJS.TypedArray;
import { INetworkOptionsBase } from '../options';
export declare type IBytes = number[] | Buffer | ArrayBuffer | TypedArray;
export declare type IBloby = Blob | File;
export declare type IBufferList = Buffer[];
export declare type IFileContent = IBytes | IBloby | string | Iterable<number> | IAsyncIterableAble<IBytes>;
export declare type IAsyncIterableAble<T> = Iterable<T> | AsyncIterable<T>;
export declare type IAsyncIterableAbleOrValue<T> = T | IAsyncIterableAble<T>;
export declare type IUnixTime = Date | {
    secs: number;
    nsecs?: number;
} | number[];
export interface IFileObject {
    path?: string;
    content?: IFileContent;
    mode?: number | string;
    mtime?: IUnixTime;
}
export declare type IFileData = IAsyncIterableAbleOrValue<IFileObject> | IAsyncIterableAbleOrValue<IBloby> | IAsyncIterableAbleOrValue<IBytes> | IAsyncIterableAbleOrValue<string> | Iterable<number>;
export interface IMtime {
    secs: number;
    nsecs: number;
}
export interface IIPFSFileApi {
    add(data: IFileData, options?: any): AsyncIterable<{
        path: '/tmp/myfile.txt';
        cid: any;
        mode: number;
        mtime: IMtime;
        size: number;
    }>;
    cat(ipfsPath: any, options?: {
        offset?: number;
        length?: number;
    } & INetworkOptionsBase): AsyncIterable<Buffer>;
    get(ipfsPath: any, options?: any): AsyncIterable<{
        path: string;
        content: AsyncIterable<IBufferList>;
        mode: number;
        mtime: IMtime;
    }>;
    ls(ipfsPath: any): AsyncIterable<{
        depth: number;
        name: string;
        path: string;
        size: number;
        cid: any;
        type: 'file' | string;
        mode: number;
        mtime: IMtime;
    }>;
}
