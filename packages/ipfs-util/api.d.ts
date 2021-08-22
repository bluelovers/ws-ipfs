import { IIPFSAddresses } from 'ipfs-types';
export { ipfsApiAddresses, ipfsGatewayAddresses } from '@lazy-ipfs/ipfs-api-url';
export { checkIPFS, assertCheckIPFS } from '@lazy-ipfs/check-ipfs-connect/index';
export declare function ipfsAddresses(ipfs: any): Promise<IIPFSAddresses>;
