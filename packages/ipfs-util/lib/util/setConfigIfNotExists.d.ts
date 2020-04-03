import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
export declare type IConfigEntry = [string, any, IConfigEntryFilter?];
export declare type IConfigEntryFilter = (oldValue: any, key: string, ipfs: IIPFSConfigApi) => boolean | PromiseLike<boolean>;
export declare function setConfigIfNotExistsLazy(ipfs: IIPFSConfigApi, entries: IConfigEntry[]): Promise<boolean[]>;
export declare function setConfigIfNotExists(ipfs: IIPFSConfigApi, key: string, value: any, filter?: IConfigEntryFilter): Promise<boolean>;
export default setConfigIfNotExistsLazy;
