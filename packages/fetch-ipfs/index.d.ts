/// <reference types="node" />
import { IFetchOptions } from './util';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare function fetchIPFS(cid: ICIDValue, useIPFS?: any, timeout?: number, options?: IFetchOptions): Promise<Buffer>;
export declare function fetchIPFSCore(cidLink: ICIDValue, useIPFS?: any, timeout?: number, options?: IFetchOptions): Promise<Buffer>;
export default fetchIPFS;
