import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
export declare function config(ipfs: IIPFSConfigApi): Promise<{
    get: import("../util").IRunCheck<Error>;
    profiles: {
        list: import("../util").IRunCheck<Error>;
        apply: import("../util").IRunCheck<Error>;
    };
}>;
export default config;
