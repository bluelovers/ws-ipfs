import { IExtendOptions, IHasFilesAPI } from './types';
import { RmOptions } from 'ipfs-core-types/src/files';
export type IFilesRmOptionsExtra = IExtendOptions<RmOptions, {
    overwrite?: boolean;
}>;
export declare function ipfsFilesRemove(ipfs: IHasFilesAPI, path: string | string[], options?: IFilesRmOptionsExtra): Promise<void>;
