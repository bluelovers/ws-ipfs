import { StatOptions } from 'ipfs-core-types/src/files';
import { IExtendOptions, IHasFilesAPI, IOptionsExtra } from './types';
export declare type IFilesStatOptionsExtra = IExtendOptions<StatOptions>;
export declare function ipfsFilesStat(ipfs: IHasFilesAPI, path: string, options?: IFilesStatOptionsExtra): Promise<import("ipfs-core-types/src/files").StatResult>;
export declare function _returnStat01(ipfs: IHasFilesAPI, path: string, extraOptions?: IOptionsExtra<{}>): Promise<import("ipfs-core-types/src/files").StatResult>;
export declare function _returnStat02<P extends Promise<any>>(p: P, ipfs: IHasFilesAPI, path: string, extraOptions?: IOptionsExtra<{}>): Promise<import("ipfs-core-types/src/files").StatResult> | P;
