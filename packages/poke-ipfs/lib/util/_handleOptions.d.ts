/// <reference types="node" />
import { IPokeOptions } from '../types';
import { RequestInit } from 'node-fetch';
import { AbortControllerTimer } from 'abort-controller-timer';
export declare function _handleOptions(options?: IPokeOptions): {
    fetchOptions: RequestInit;
    controller: AbortControllerTimer<number | NodeJS.Timeout>;
    cors?: boolean;
    timeout?: number;
    signal?: AbortSignal;
};
