/// <reference types="node" />
/**
 * Created by user on 2020/3/22.
 */
import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { ITSValueOrArray } from 'ts-type';
import Bluebird from 'bluebird';
export declare function lazyRaceServerList(): IIPFSClientAddresses[];
export declare function raceFetchIPFS(cid: string, useIPFS: ITSValueOrArray<(string | IIPFSPromiseApi | IIPFSClientAddresses)>, timeout?: number, options?: {
    filter?(buf: Buffer): boolean;
}): Bluebird<Buffer>;
export default raceFetchIPFS;
