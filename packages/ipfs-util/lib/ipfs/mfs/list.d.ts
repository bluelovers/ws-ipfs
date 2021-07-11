/**
 * Created by user on 2020/3/25.
 */
import { IMutableFileSystemFileObject, EnumMutableFileSystemType, EnumMutableFileSystemTypeName, IMutableFileSystemType } from 'ipfs-types/lib/ipfs/files';
import { ITSResolvable } from 'ts-type';
import micromatch from 'micromatch';
import { IPFS } from 'ipfs-core-types';
export declare function mfsFileType(type: EnumMutableFileSystemType | EnumMutableFileSystemTypeName | string | number): IMutableFileSystemType;
export declare function fixDirPath(dir: string): string;
export declare function fixPath(dir: string): string;
export declare function fixMarkDirectories(dir: string): string;
export declare function isNull(value: any): value is void;
export declare function deepFilesListCore(ipfs: IPFS, rootPath: string, options?: {
    prefix?: string;
    deep?: number;
    level?: number;
}): AsyncGenerator<IMutableFileSystemFileObject, void>;
export declare function ipfsFilesExists(ipfs: IPFS, targetPath: string): Promise<boolean>;
export declare function deepFilesList(ipfs: IPFS, options?: {
    cwd?: string;
    globPattern?: string[];
    globOptions?: micromatch.Options;
    filter?(file: IMutableFileSystemFileObject): ITSResolvable<boolean>;
    onlyDirectories?: boolean;
    onlyFiles?: boolean;
    absolute?: boolean;
    markDirectories?: boolean;
    deep?: number;
    recursive?: boolean;
}): AsyncGenerator<IMutableFileSystemFileObject, void, unknown>;
export default deepFilesList;
