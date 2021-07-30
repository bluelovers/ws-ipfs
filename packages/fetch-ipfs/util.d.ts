/// <reference types="node" />
import { IOptionsInput } from 'to-ipfs-url';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { AbortControllerTimer } from 'abort-controller-timer';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare type IFetchOptions = Exclude<IOptionsInput, string>;
export declare function newAbortController(timeout: number): {
    controller: AbortControllerTimer;
    timer: number | NodeJS.Timeout;
};
export declare function handleCID(cid: ICIDValue, useIPFS?: any, options?: IOptionsInput): ICIDValue;
export declare function handleTimeout(timeout: number | string): number;
export declare function lazyRaceServerList(): IIPFSClientAddresses[];
