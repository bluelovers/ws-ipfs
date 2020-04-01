import _ipfsHttpModule from 'ipfs-http-client'
import use, { find } from './core';

export type { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';

/**
 * auto detect go-ipfs and js-ipfs
 */
export const ipfsClient = use(_ipfsHttpModule);

export const findIpfsClient = find(_ipfsHttpModule);

export default ipfsClient
