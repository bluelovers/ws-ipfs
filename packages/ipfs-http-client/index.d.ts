export type { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
/**
 * auto detect go-ipfs and js-ipfs
 */
export declare const ipfsClient: import("./core").IIPFSClientFnWrap;
export declare const findIpfsClient: (ipfsServerList: import("./core").IIPFSClientAddresses[], options?: {
    skipCheck?: boolean;
    clientArgvs?: any[];
    checkIPFSFn?(ipfs: import("ipfs-types").IIPFSPromiseApi<{}>): import("ts-type").ITSResolvable<boolean>;
}) => Promise<import("ipfs-http-client/dist/src/types").IPFSHTTPClient>;
export default ipfsClient;
