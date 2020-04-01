export type { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
/**
 * auto detect go-ipfs and js-ipfs
 */
export declare const ipfsClient: import("./core").IIPFSClientFnWrap;
export declare const findIpfsClient: (ipfsServerList: import("./core").IIPFSClientAddresses[], options?: {
    skipCheck?: boolean;
    clientOptions?: any[];
}) => Promise<any>;
export default ipfsClient;
