import { IIPFSObjectApi } from 'ipfs-types/lib/ipfs/object';
export declare function object(ipfs: IIPFSObjectApi): Promise<{
    get: import("../util").IRunCheck<Error>;
    data: import("../util").IRunCheck<Error>;
    stat: import("../util").IRunCheck<Error>;
}>;
export default object;
