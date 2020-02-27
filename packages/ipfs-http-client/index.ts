import _ipfsHttpModule from 'ipfs-http-client'
import use from './core';

export type { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';

/**
 * auto detect go-ipfs and js-ipfs
 */
export const ipfsClient = use(_ipfsHttpModule);

export default ipfsClient
