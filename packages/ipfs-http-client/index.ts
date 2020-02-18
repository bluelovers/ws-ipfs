import _ipfsHttpModule from 'ipfs-http-client'
import use from './core';

/**
 * auto detect go-ipfs and js-ipfs
 */
export const ipfsClient = use(_ipfsHttpModule);

export default ipfsClient
