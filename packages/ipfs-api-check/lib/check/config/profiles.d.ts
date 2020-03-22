import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
export declare function profiles(ipfs: IIPFSConfigApi): Promise<{
    list: import("../../util").IRunCheck<Error>;
    apply: import("../../util").IRunCheck<Error>;
}>;
export default profiles;
