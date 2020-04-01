export interface IIPFSEnv {
    IPFS_ADDRESSES_API?: string;
    IPFS_PATH?: string;
    /**
     * @see https://github.com/ipfs/js-ipfsd-ctl#ipfs_js_exec-and-ipfs_go_exec
     */
    IPFS_JS_EXEC?: string;
    /**
     * @see https://github.com/ipfs/js-ipfsd-ctl#ipfs_js_exec-and-ipfs_go_exec
     */
    IPFS_GO_EXEC?: string;
}
export interface IIPFSEnvRuntime extends IIPFSEnv {
    [key: string]: string;
}
export declare function ipfsEnv(env?: Record<any, any>): IIPFSEnvRuntime;
export default ipfsEnv;