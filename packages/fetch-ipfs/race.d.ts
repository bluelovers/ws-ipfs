/// <reference types="node" />
/// <reference types="bluebird" />
/**
 * Created by user on 2020/3/22.
 */
import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { ITSValueOrArray } from 'ts-type';
import { IFetchOptions } from './util';
export declare function raceFetchIPFS(cid: string, useIPFS: ITSValueOrArray<(string | IIPFSPromiseApi | IIPFSClientAddresses)>, timeout?: number, options?: {
    filter?(buf: Buffer): boolean;
} & IFetchOptions): import("bluebird")<Buffer>;
export default raceFetchIPFS;
