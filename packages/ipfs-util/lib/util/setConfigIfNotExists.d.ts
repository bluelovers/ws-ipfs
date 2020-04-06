import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import { IIPFSPromiseApi } from 'ipfs-types';
export declare type IConfigEntry = [string, IConfigEntryValue, IConfigEntryOptions?];
export declare type IConfigEntryValue = unknown | IConfigEntryValueFn;
export declare type IConfigEntryOptions = {
    filter?: IConfigEntryFilter;
};
export declare type IConfigEntryFilter = (oldValue: any, key: string, ipfs: IIPFSConfigApi) => boolean | PromiseLike<boolean>;
export declare type IConfigEntryValueFn = <T>(oldValue: T | unknown, key: string, ipfs: IIPFSPromiseApi) => T | PromiseLike<T>;
export declare function setConfigIfNotExistsLazy(ipfs: IIPFSConfigApi, entries: IConfigEntry[]): Promise<boolean[]>;
export declare function fillEntryIfNotExists<T extends any>(newValue: T[], opts?: {
    includesFn?: (value: T, index: string, oldValue: (T | unknown)[], key: string, ipfs: IIPFSConfigApi) => boolean | PromiseLike<boolean>;
}): IConfigEntryValueFn;
export declare function setConfigIfNotExists(ipfs: IIPFSConfigApi, key: string, value: IConfigEntryValue, options?: IConfigEntryOptions): Promise<boolean>;
export default setConfigIfNotExistsLazy;
