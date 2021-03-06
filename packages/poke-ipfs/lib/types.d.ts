/**
 * Created by user on 2020/4/3.
 */
import CID from 'cids';
export declare type ICIDValue = CID | string;
export declare type IAsyncIteratorAble<T> = AsyncGenerator<T, void> | ReadableStream<T>;
export declare type IPokeReturnBase = {
    value?: never;
    status?: number;
    statusText?: string;
    error?: Error;
    headers?: Headers;
};
export declare type IPokeReturn<T extends Record<string, any> = never> = T extends never ? IPokeReturnBase : Omit<IPokeReturnBase, keyof T> & T;
export interface IPokeOptions {
    cors?: boolean;
    /**
     * @default 1000
     */
    timeout?: number;
}
