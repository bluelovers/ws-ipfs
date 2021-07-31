/// <reference types="node" />
import Bluebird from 'bluebird';
import { IFetchOptions } from './util';
import { IPFS } from 'ipfs-core-types';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare function refIPFS(cid: ICIDValue, ipfs: Pick<IPFS, 'refs'>, timeout?: number, options?: IFetchOptions): Bluebird<any>;
export declare function catIPFS(cid: ICIDValue, ipfs: Pick<IPFS, 'refs' | 'cat'>, timeout?: number, options?: IFetchOptions): Bluebird<Buffer>;
export default catIPFS;
