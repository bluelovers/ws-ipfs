///<reference lib="es2020" />

export interface PromiseFulfilledResult<T>
{
	status: "fulfilled";
	value: T;

	reason?: never;
}

export interface PromiseRejectedResult<E = any>
{
	status: "rejected";
	reason: E;

	value?: never;
}

export type PromiseSettledResult<T, E = any> = PromiseFulfilledResult<T> | PromiseRejectedResult<E>;

