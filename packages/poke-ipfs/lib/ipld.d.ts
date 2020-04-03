/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
export declare type IAsyncIteratorAble<T> = AsyncGenerator<T, void> | ReadableStream<T>;
export declare function pokeIPLD(cid: ICIDValue): Promise<{
    value: true;
    status: number;
    statusText: string;
} | {
    value: false;
    status: number;
    statusText: string;
} | {
    status: number;
    statusText: string;
    value?: undefined;
} | {
    error: Error;
}>;
export default pokeIPLD;
