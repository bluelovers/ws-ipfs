/// <reference types="node" />
import { IFetchOptions } from './util';
export declare function fetchIPFS(cid: string, useIPFS?: any, timeout?: number, options?: IFetchOptions): Promise<Buffer>;
export declare function fetchIPFSCore(cidLink: string, useIPFS?: any, timeout?: number, options?: IFetchOptions): Promise<Buffer>;
export default fetchIPFS;
