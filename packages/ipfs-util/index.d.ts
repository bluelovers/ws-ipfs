/// <reference types="node" />
import type { IIPFSAddresses } from 'ipfs-types';
export declare function isBufferMaybe(buf: any): buf is Buffer;
export declare function checkIPFS(ipfs: any): Promise<boolean>;
export declare function ipfsAddresses(ipfs: any): Promise<IIPFSAddresses>;
