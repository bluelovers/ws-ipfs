import { IIPFSKeyApi } from 'ipfs-types/lib/ipfs/key';
export declare function key(ipfs: IIPFSKeyApi): Promise<{
    gen: import("../util").IRunCheck<Error>;
    list: import("../util").IRunCheck<Error>;
    rm: import("../util").IRunCheck<Error>;
    rename: import("../util").IRunCheck<Error>;
    export: import("../util").IRunCheck<Error>;
    import: import("../util").IRunCheck<Error>;
}>;
export default key;
