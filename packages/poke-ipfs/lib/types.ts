/**
 * Created by user on 2020/4/3.
 */

import fetch from 'cross-fetch';
import { RequestInit, RequestInfo, Response } from 'node-fetch';

export type IAsyncIteratorAble<T> = AsyncGenerator<T, void> | ReadableStream<T>;

export type IPokeReturnBase = {
	value?: never;
	status?: number;
	statusText?: string;
	error?: Error;
	headers?: Headers;
}

export type IPokeReturn<T extends Record<string, any> = never> = T extends never ? IPokeReturnBase : Omit<IPokeReturnBase , keyof T> & T

export interface IPokeOptions
{
	cors?: boolean
	/**
	 * @default 1000
	 */
	timeout?: number

	fetchOptions?: RequestInit,
}
