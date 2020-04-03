import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
export declare function configDefaultAll(ipfs: IIPFSConfigApi, skipCheck?: boolean): Promise<boolean[][]>;
export default configDefaultAll;
