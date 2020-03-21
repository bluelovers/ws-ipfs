import { IIPFSRefsApi } from 'ipfs-types/lib/ipfs/refs';
export declare function refs(ipfs: IIPFSRefsApi): Promise<{
    success: boolean | void;
    spendTime: number;
    error: Error;
}>;
export default refs;
