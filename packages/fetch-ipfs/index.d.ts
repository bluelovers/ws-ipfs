/// <reference types="node" />
export declare function fetchIPFS(cid: string, useIPFS?: any, timeout?: number): Promise<Buffer>;
export declare function fetchIPFSCore(cid: string, useIPFS?: any, timeout?: number): Promise<Buffer>;
export default fetchIPFS;
