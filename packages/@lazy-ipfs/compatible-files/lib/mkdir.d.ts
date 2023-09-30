import { MkdirOptions, StatResult } from 'ipfs-core-types/src/files';
import { IExtendOptions, IHasFilesAPI } from './types';
export type IFilesMakeDirectoryOptionsExtra = IExtendOptions<MkdirOptions>;
export declare function ipfsFilesMakeDirectory(ipfs: IHasFilesAPI, dir_path: string, options?: IFilesMakeDirectoryOptionsExtra): Promise<StatResult>;
