import { IIPFSAddresses } from 'ipfs-types';
import Bluebird from 'bluebird';
export declare function checkIPFS(ipfs: any): Bluebird<true>;
export declare function assertCheckIPFS(ipfs: any): Bluebird<true>;
export declare function ipfsAddresses(ipfs: any): Promise<IIPFSAddresses>;
export declare function ipfsApiAddresses(ipfs: any): Promise<string>;
export declare function ipfsGatewayAddresses(ipfs: any): Promise<string>;
