import { IIPFSNameApi } from 'ipfs-types/lib/ipfs/name';
export declare function name(ipfs: IIPFSNameApi): Promise<{
    publish: import("../util").IRunCheck<Error>;
    pubsub: {
        cancel: import("../util").IRunCheck<Error>;
        state: import("../util").IRunCheck<Error>;
        subs: import("../util").IRunCheck<Error>;
    };
    resolve: import("../util").IRunCheck<Error>;
}>;
export default name;
