/// <reference types="node" />
/// <reference types="bluebird" />
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { ITSValueOrArray } from 'ts-type';
import { IFetchOptions } from './util';
import { IPFS } from 'ipfs-core-types';
export declare function raceFetchIPFS(cid: string, useIPFS: ITSValueOrArray<(string | Pick<IPFS, 'refs' | 'cat'> | IIPFSClientAddresses)>, timeout?: number, options?: {
    filter?(buf: Buffer): boolean;
} & IFetchOptions): import("bluebird")<Buffer>;
export default raceFetchIPFS;
