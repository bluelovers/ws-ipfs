/// <reference types="node" />
import { IOptionsInput } from 'to-ipfs-url';
export declare function handleCID(cid: string, useIPFS?: any, options?: IOptionsInput): string;
export declare function handleTimeout(timeout: number): number;
export declare function fetchIPFS(cid: string, useIPFS?: any, timeout?: number): Promise<Buffer>;
export declare function fetchIPFSCore(cid: string, useIPFS?: any, timeout?: number): Promise<Buffer>;
export default fetchIPFS;
