/// <reference types="node" />
import Bluebird from 'bluebird';
import { IIPFSPromiseApi } from 'ipfs-types';
export declare function refIPFS(cid: string, ipfs: IIPFSPromiseApi, timeout?: number): Bluebird<import("ipfs-types/lib/ipfs/refs").IRefsObject>;
export declare function catIPFS(cid: string, ipfs: IIPFSPromiseApi, timeout?: number): Bluebird<Buffer>;
export default catIPFS;
