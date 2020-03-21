/**
 * Created by user on 2020/3/21.
 */
/// <reference types="node" />
export declare function runSubCheck<T>(fn: () => T): Promise<{
    success: boolean | void;
    spendTime: number;
    error: Error;
}>;
export declare function isBufferMaybe(buf: any): buf is Buffer;
