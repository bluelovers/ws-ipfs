/**
 * Created by user on 2020/4/3.
 */
import { RequestInit } from 'node-fetch';
import { ITSUnpackedPromiseLike } from 'ts-type';
import pokeURL from './pokeURL';
export type IAsyncIteratorAble<T> = AsyncGenerator<T, void> | ReadableStream<T>;
export type IPokeReturnBase = {
    value?: never;
    status?: number;
    statusText?: string;
    error?: Error;
    headers?: Headers;
    href?: string;
};
export type IPokeReturn<T extends Record<string, any> = never> = T extends never ? IPokeReturnBase : Omit<IPokeReturnBase, keyof T> & T;
export interface IPokeOptions {
    cors?: boolean;
    /**
     * @default 1000
     */
    timeout?: number;
    signal?: AbortSignal;
    fetchOptions?: RequestInit;
}
export type IPokeResult = ITSUnpackedPromiseLike<ReturnType<typeof pokeURL>>;
export type IPokeResultWithValue = IPokeReturn<{
    value: string;
}>;
