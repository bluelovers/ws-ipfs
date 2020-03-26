/// <reference lib="es2020" />
export interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}
export interface PromiseRejectedResult<E = any> {
    status: "rejected";
    reason: E;
}
export declare type PromiseSettledResult<T, E = any> = PromiseFulfilledResult<T> | PromiseRejectedResult<E>;
