/// <reference types="node" />
export declare function handleCID(cid: string, useIPFS?: any): string;
export declare function handleTimeout(timeout: number): number;
export declare function fetchIPFS(cid: string, useIPFS?: any, timeout?: number): Promise<Buffer>;
export declare function fetchIPFSCore(cid: string, useIPFS?: any, timeout?: number): Promise<Buffer>;
export default fetchIPFS;
