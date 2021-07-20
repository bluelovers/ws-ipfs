import CID from 'cids';
import { DAGNode, DAGLink } from 'ipld-dag-pb';
import { IMultiaddr } from './ipfs/types';

import { Mtime as IMtime } from 'ipfs-unixfs'
import { MtimeLike } from 'ipfs-unixfs/dist/src/types';

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

export type IMtimeInput = Date | IMtime | number[] | [number, number] | MtimeLike;

export { IMtime }

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

export type IDAGLink = DAGLink & {
	Name: string,
	Hash: ICIDObject,
	Tsize: number,
}

export type IDagNodeCbor = Record<any, any>;

export type IDagNodeValue = IDagNodeCbor | IDagNode | {
	size?,
	Data?,
	Links?,
};

export type IDagFormat = string | 'dag-pb' | 'dag-cbor';
export type IDagHashAlg = string | 'sha2-256' | 'sha3-512';

export interface IVersion
{
	version: string;
	repo: string;
	commit: string;
	system?: string | 'amd64/windows';
	golang?: string;
}

export interface IId
{
	id: string;
	publicKey: string;
	addresses: IMultiaddr[];
	agentVersion: string;
	protocolVersion: string | '9000' | 'ipfs/0.1.0';
}
