/// <reference lib="es2020" />
export interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}
export interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}
export declare type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;
