import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
export declare function version(ipfs: IIPFSApiUtils): Promise<{
    success: boolean | void;
    spendTime: number;
    error: Error;
}>;
export default version;
