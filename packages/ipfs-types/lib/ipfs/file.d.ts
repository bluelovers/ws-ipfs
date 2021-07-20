/// <reference types="node" />
import TypedArray = NodeJS.TypedArray;
import BufferList from 'bl';
import { IMtimeInput, IAsyncIterableAbleOrValue, IAsyncIterableAble, IDagHashAlg } from '../types';
import { AddOptions as IIPFSFileApiAddOptions, AddResult as IIPFSFileApiAddReturnEntry } from 'ipfs-core-types/src/root';
import { IPFS } from 'ipfs-core-types';
export declare type IBytes = number[] | Buffer | ArrayBuffer | TypedArray;
export declare type IBloby = Blob | File;
export declare type IBufferList = BufferList;
export declare type IFileContent = IBytes | IBloby | string | Iterable<number> | IAsyncIterableAble<IBytes>;
export interface IFileObject {
    path?: string;
    content?: IFileContent;
    mode?: number | string;
    mtime?: IMtimeInput;
}
export declare type IFileData = IAsyncIterableAbleOrValue<IFileObject> | IAsyncIterableAbleOrValue<IBloby> | IAsyncIterableAbleOrValue<IBytes> | IAsyncIterableAbleOrValue<string> | Iterable<number>;
declare module "ipfs-core-types/src/root" {
    interface AddOptions {
        hashAlg?: IDagHashAlg;
        chunker?: string | 'size-262144' | 'rabin';
    }
}
export { IIPFSFileApiAddOptions };
export { IIPFSFileApiAddReturnEntry };
/**
 * @deprecated
 */
export interface IIPFSFileApi extends Pick<IPFS, 'add' | 'cat' | 'get' | 'ls'> {
}
