/// <reference types="node" />
import { IOptionsInput } from 'to-ipfs-url';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { AbortControllerTimer } from 'abort-controller-timer';
export declare type IFetchOptions = Exclude<IOptionsInput, string>;
export declare function newAbortController(timeout: number): {
    controller: AbortControllerTimer;
    timer: number | NodeJS.Timeout;
};
export declare function handleCID(cid: string, useIPFS?: any, options?: IOptionsInput): string;
export declare function handleTimeout(timeout: number | string): number;
export declare function lazyRaceServerList(): IIPFSClientAddresses[];
