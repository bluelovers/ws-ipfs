import _ipfsHttpModule from 'ipfs-http-client'
import use, { find, IIPFSClientFn } from './core';

export type { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';

/**
 * auto detect go-ipfs and js-ipfs
 */
export const ipfsClient = use(_ipfsHttpModule as any as IIPFSClientFn);

export const findIpfsClient = find(_ipfsHttpModule as any as IIPFSClientFn);

export default ipfsClient
