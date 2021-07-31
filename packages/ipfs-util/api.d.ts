import { IIPFSAddresses } from 'ipfs-types';
import Bluebird from 'bluebird';
export { ipfsApiAddresses, ipfsGatewayAddresses } from '@lazy-ipfs/ipfs-api-url';
export declare function checkIPFS(ipfs: any): Bluebird<true>;
export declare function assertCheckIPFS(ipfs: any): Bluebird<true>;
export declare function ipfsAddresses(ipfs: any): Promise<IIPFSAddresses>;
