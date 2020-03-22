/// <reference types="node" />
import AbortController from 'abort-controller';
export declare function newAbortController(timeout: number): {
    controller: AbortController;
    timer: NodeJS.Timeout;
};
