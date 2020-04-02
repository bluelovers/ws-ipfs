import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
export declare function setConfigIfNotExistsLazy(ipfs: IIPFSConfigApi, entries: [string, any][]): Promise<boolean[]>;
export declare function setConfigIfNotExists(ipfs: IIPFSConfigApi, key: string, value: any): Promise<boolean>;
export default setConfigIfNotExistsLazy;
