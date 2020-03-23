/// <reference types="node" />
import AbortController from 'abort-controller';
import { IOptionsInput } from 'to-ipfs-url';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
export declare function newAbortController(timeout: number): {
    controller: AbortController;
    timer: NodeJS.Timeout;
};
export declare function handleCID(cid: string, useIPFS?: any, options?: IOptionsInput): string;
export declare function handleTimeout(timeout: number | string): number;
export declare function lazyRaceServerList(): IIPFSClientAddresses[];
