/// <reference types="node" />
import { IOptions } from 'to-ipfs-url';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { AbortControllerTimer } from 'abort-controller-timer';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { RequestInit } from 'node-fetch';
export interface IFetchOptions extends IOptions {
    timeout?: number;
    signal?: AbortSignal;
    fetchOptions?: RequestInit;
}
export declare function newAbortController(timeout: number): {
    controller: AbortControllerTimer<number | NodeJS.Timeout>;
    timer: number | NodeJS.Timeout;
};
export declare function handleCID(cid: ICIDValue, useIPFS?: any, options?: IFetchOptions): ICIDValue;
export declare function handleTimeout(timeout: number | string): number;
export declare function lazyRaceServerList(): IIPFSClientAddresses[];
