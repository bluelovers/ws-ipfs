/// <reference types="node" />
import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';
import { ICIDValue } from '../@lazy-ipfs/detect-cid-lib/lib/types';
export declare function refIPFS(cid: ICIDValue, ipfs: Pick<IPFS, 'refs'>, timeout?: number): Bluebird<any>;
export declare function catIPFS(cid: ICIDValue, ipfs: Pick<IPFS, 'refs' | 'cat'>, timeout?: number): Bluebird<Buffer>;
export default catIPFS;
