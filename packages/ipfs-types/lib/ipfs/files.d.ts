/**
 * Created by user on 2020/3/25.
 */
import { ICIDValue, ICIDObject, IMtime } from '../types';
import { IApiOptions } from '../options';
import { IFileContent } from './file';
import { IPFS } from 'ipfs-core-types';
export declare const enum EnumMutableFileSystemType {
    FILE = 0,
    DIR = 1
}
export declare const enum EnumMutableFileSystemTypeName {
    FILE = "file",
    DIR = "directory"
}
export declare type IMutableFileSystemType = EnumMutableFileSystemType.FILE | EnumMutableFileSystemType.DIR | 0 | 1;
export declare type IMutableFileSystemTypeName = EnumMutableFileSystemTypeName.FILE | EnumMutableFileSystemTypeName.DIR | 'file' | 'directory';
export interface IMutableFileSystemFileObject {
    name: string;
    type: IMutableFileSystemType;
    size: number;
    mode: number;
    cid: ICIDObject;
    mtime?: IMtime;
}
export interface IIPFSFilesApiCore {
    chmod(path: any, mode: any, options?: any): any;
    cp(from: any, to: any, options?: any): any;
    mkdir(path: any, options?: any): any;
    read(path: any, options?: any): any;
    rm(paths: any, options?: any): any;
    stat(pathOrCID: ICIDValue, options?: IApiOptions<{
        hash?: boolean;
        size?: boolean;
        withLocal?: boolean;
    }>): Promise<{
        type: IMutableFileSystemTypeName;
        blocks: number;
        size: number;
        cumulativeSize: number;
        withLocality: boolean;
        mode: number;
        cid: ICIDObject;
    }>;
    touch(path: any, options?: any): any;
    write(path: string, content: IFileContent, options?: {
        offset?: number;
        create?: boolean;
        truncate?: boolean;
        parents?: boolean;
        length?: number;
        rawLeaves?: boolean;
        cidVersion?: number;
        mode?: number;
        mtime?: IMtime;
    }): Promise<void>;
    mv(from: any, to: any, options?: any): any;
    flush(path?: string): any;
    ls(pathOrCID?: ICIDValue, options?: IApiOptions<{
        sort?: boolean;
    }>): AsyncIterable<IMutableFileSystemFileObject>;
}
export interface IIPFSFilesApi extends Pick<IPFS, 'files'> {
}
