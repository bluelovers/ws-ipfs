/// <reference types="node" />
import Bluebird from 'bluebird';
export declare function refIPFS(cid: string, ipfs: any, timeout?: number): Bluebird<any>;
export declare function catIPFS(cid: string, ipfs: any, timeout?: number): Bluebird<Buffer>;
export default catIPFS;
