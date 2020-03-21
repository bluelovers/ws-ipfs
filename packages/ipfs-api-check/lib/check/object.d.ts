import { IIPFSObjectApi } from 'ipfs-types/lib/ipfs/object';
export declare function object(ipfs: IIPFSObjectApi): Promise<{
    get: {
        success: boolean | void;
        spendTime: number;
        error: Error;
    };
    data: {
        success: boolean | void;
        spendTime: number;
        error: Error;
    };
    stat: {
        success: boolean | void;
        spendTime: number;
        error: Error;
    };
}>;
export default object;
