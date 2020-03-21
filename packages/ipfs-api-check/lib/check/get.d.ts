import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
export declare function get(ipfs: IIPFSFileApi): Promise<{
    success: boolean | void;
    spendTime: number;
    error: Error;
}>;
export default get;
