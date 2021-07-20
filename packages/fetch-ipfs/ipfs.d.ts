/// <reference types="node" />
import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';
export declare function refIPFS(cid: string, ipfs: Pick<IPFS, 'refs'>, timeout?: number): Bluebird<import("ipfs-core-types/src/refs").RefsResult>;
export declare function catIPFS(cid: string, ipfs: Pick<IPFS, 'refs' | 'cat'>, timeout?: number): Bluebird<Buffer>;
export default catIPFS;
