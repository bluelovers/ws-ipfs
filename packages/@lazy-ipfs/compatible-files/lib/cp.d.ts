import { IExtendOptions, IHasFilesAPI } from './types';
import { IPFSPath } from 'ipfs-core-types/src/utils';
import { CpOptions, StatResult } from 'ipfs-core-types/src/files';
import { ITSValueOrArray } from 'ts-type/lib/type/base';
export declare type IFilesCpOptionsExtra = IExtendOptions<CpOptions, {
    overwrite?: boolean;
    validCheck?: boolean;
}>;
/**
 * @see https://github.com/ipfs/js-ipfs/issues/3747
 */
export declare function _ipfsFilesCopy(ipfs: IHasFilesAPI, from: ITSValueOrArray<IPFSPath>, to: string, options?: CpOptions): Promise<void>;
export declare function ipfsFilesCopy(ipfs: IHasFilesAPI, from: ITSValueOrArray<IPFSPath>, to: string, options?: IFilesCpOptionsExtra): Promise<StatResult>;
