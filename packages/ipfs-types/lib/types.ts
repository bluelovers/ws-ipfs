import CID from 'cids';
import { DAGNode } from 'ipld-dag-pb';

export type ICallback<T, E = Error, R = void> = (error: E, result?: T) => R;

export type IParametersWithCallbackWithMaybeArgv<T, Argv1 = any, E = Error> =
	[ICallback<T, E>]
	| [Argv1, ICallback<T, E>];

export interface IErrorLike
{
	message: any
}

export type ICIDObject = CID;
export type ICIDValue = ICIDObject | string;
export type IAsyncIterableAble<T> = Iterable<T> | AsyncIterable<T>
export type IAsyncIterableAbleOrValue<T> = T | IAsyncIterableAble<T>;
export type IUnixTime = Date | { secs: number, nsecs?: number } | number[];

export interface IMtime
{
	secs: number;
	nsecs: number;
}

export type IMultihash = string | Buffer;

export type IDagNode = DAGNode & {

	readonly size: number,
	readonly Data: Buffer,
	readonly Links: any[],

	toJSON<T>(): T,
	toString(): string,

	addLink(link),
	rmLink(link),
	toDAGLink(options),
	serialize(): Buffer,

	_invalidateCached(),

};

export type IDagNodeCbor = Record<any, any>;

export type IDagNodeValue = IDagNodeCbor | IDagNode | {
	size?,
	Data?,
	Links?,
};

export type IDagFormat = string | 'dag-pb' | 'dag-cbor';
export type IDagHashAlg = string | 'sha2-256' | 'sha3-512';
