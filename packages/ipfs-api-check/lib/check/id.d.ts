import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
export declare function id(ipfs: IIPFSApiUtils): Promise<{
    success: boolean | void;
    spendTime: number;
    error: Error;
}>;
export default id;
