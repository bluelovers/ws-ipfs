/// <reference types="node" />
import TypedArray = NodeJS.TypedArray;
import { INetworkOptionsBase } from '../options';
import BufferList from 'bl';
import { IMtime, IUnixTime, IAsyncIterableAbleOrValue, IAsyncIterableAble, ICIDObject } from '../types';
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
export interface IIPFSFileApi {
    add(data: IFileData, options?: any): AsyncIterable<{
        path: string;
        cid: ICIDObject;
        mode: number;
        mtime: IMtime;
        size: number;
    }>;
    cat(ipfsPath: any, options?: {
        offset?: number;
        length?: number;
    } & INetworkOptionsBase): AsyncIterable<Buffer>;
    get(ipfsPath: any, options?: {} & INetworkOptionsBase): AsyncIterable<{
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
        cid: ICIDObject;
        type: 'file' | string;
        mode: number;
        mtime: IMtime;
    }>;
}
