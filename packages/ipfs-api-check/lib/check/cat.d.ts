import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
/**
 * https://ipfs.infura.io/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
 */
export declare function cat(ipfs: IIPFSFileApi): Promise<{
    success: boolean;
    spendTime: number;
    error: Error;
}>;
export default cat;
