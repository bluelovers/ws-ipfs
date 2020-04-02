import { IIPFSAddresses } from 'ipfs-types';
export declare function checkIPFS(ipfs: any): Promise<boolean>;
export declare function ipfsAddresses(ipfs: any): Promise<IIPFSAddresses>;
export declare function ipfsApiAddresses(ipfs: any): Promise<string>;
export declare function ipfsGatewayAddresses(ipfs: any): Promise<string>;
