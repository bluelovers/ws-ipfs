import { IMultiaddrToURLOptions } from 'multiaddr-to-url';
export declare function ipfsApiAddresses(ipfs: any): Promise<string>;
export declare function ipfsGatewayAddresses(ipfs: any): Promise<string>;
export declare function ipfsApiAddressesLink(ipfs: any, opts?: IMultiaddrToURLOptions): Promise<string>;
export declare function ipfsWebuiAddresses(ipfs: any, opts?: IMultiaddrToURLOptions): Promise<string>;
export declare function ipfsGatewayAddressesLink(ipfs: any, opts?: IMultiaddrToURLOptions): Promise<string>;
