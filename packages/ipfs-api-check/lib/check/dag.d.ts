import { IIPFSDagApi } from 'ipfs-types/lib/ipfs/dag';
export declare function dag(ipfs: IIPFSDagApi): Promise<{
    put: import("../util").IRunCheck<Error>;
    get: import("../util").IRunCheck<Error>;
    tree: import("../util").IRunCheck<Error>;
    resolve: import("../util").IRunCheck<Error>;
}>;
export default dag;
