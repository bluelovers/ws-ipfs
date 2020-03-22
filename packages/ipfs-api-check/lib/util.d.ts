/**
 * Created by user on 2020/3/21.
 */
/// <reference types="node" />
export declare type IRunCheck<E extends Error = Error> = {
    success: boolean;
    spendTime: number;
    error: E;
};
export declare function runSubCheck<T, E extends Error = Error>(fn: () => T): Promise<IRunCheck<E>>;
export declare function isBufferMaybe(buf: any): buf is Buffer;
