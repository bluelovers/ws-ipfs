import { IPFS } from 'ipfs-core-types';
import { IFilesStatOptionsExtra } from './stat';
export declare type IOptionsExtra<O extends {}> = O & {
    ignoreError?: boolean;
    returnStat?: boolean;
    statOptions?: IFilesStatOptionsExtra;
};
export declare type IExtendOptions<T extends {}, O extends {} = {}, TO extends {} = {}> = T & {
    extraOptions?: IOptionsExtra<O>;
};
export declare type IHasFilesAPI = Pick<IPFS, 'files'>;
