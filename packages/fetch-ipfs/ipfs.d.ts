/// <reference types="node" />
import Bluebird from 'bluebird';
import { IIPFSPromiseApi } from 'ipfs-types';
import { IPFS } from 'ipfs-core-types';
export declare function refIPFS(cid: string, ipfs: IIPFSPromiseApi, timeout?: number): Bluebird<import("ipfs-core-types/src/refs").RefsResult>;
export declare function catIPFS(cid: string, ipfs: IPFS, timeout?: number): Bluebird<Buffer>;
export default catIPFS;
