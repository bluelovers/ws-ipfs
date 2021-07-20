import TypedArray = NodeJS.TypedArray;
import { INetworkOptionsBase, IApiOptions } from '../options';
import BufferList from 'bl';
import { IMtime, IMtimeInput, IAsyncIterableAbleOrValue, IAsyncIterableAble, ICIDObject, IDagHashAlg } from '../types';
import { AddOptions as IIPFSFileApiAddOptions, AddResult as IIPFSFileApiAddReturnEntry } from 'ipfs-core-types/src/root';
import { IPFS } from 'ipfs-core-types';

export type IBytes = number[]
	| Buffer
	| ArrayBuffer
	| TypedArray;

export type IBloby = Blob | File;

export type IBufferList = BufferList;

export type IFileContent = IBytes
	| IBloby
	| string
	| Iterable<number>
	| IAsyncIterableAble<IBytes>
;

export interface IFileObject
{
	// The path you want to the file to be accessible at from the root CID _after_ it has been added
	path?: string
	// The contents of the file (see below for definition)
	content?: IFileContent
	// File mode to store the entry with (see https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation)
	mode?: number | string
	// The modification time of the entry (see below for definition)
	mtime?: IMtimeInput
}

export type IFileData = IAsyncIterableAbleOrValue<IFileObject>
	| IAsyncIterableAbleOrValue<IBloby>
	| IAsyncIterableAbleOrValue<IBytes>
	| IAsyncIterableAbleOrValue<string>
	| Iterable<number>
	;

declare module "ipfs-core-types/src/root"
{
	interface AddOptions
	{
		hashAlg?: IDagHashAlg,
		chunker?: string | 'size-262144' | 'rabin',
	}

}

export { IIPFSFileApiAddOptions }
export { IIPFSFileApiAddReturnEntry }

/**
 * @deprecated
 */
export interface IIPFSFileApi extends Pick<IPFS, 'add' | 'cat' | 'get' | 'ls'>
{
	/*
	add(data: IFileData, options?: IIPFSFileApiAddOptions): AsyncIterable<IIPFSFileApiAddReturnEntry>

	cat(ipfsPath, options?: IApiOptions<{
		offset?: number,
		length?: number,
	}>): AsyncIterable<Buffer>

	get(ipfsPath, options?: IApiOptions<{}>): AsyncIterable<{
		path: string,
		content: AsyncIterable<IBufferList>,
		mode: number,
		mtime: IMtime
	}>

	ls(ipfsPath, options?: IApiOptions<{}>): AsyncIterable<{
		depth: number,
		name: string,
		path: string,
		size: number,
		cid: ICIDObject,
		type: 'file' | string,
		mode: number,
		mtime: IMtime
	}>
*/
}
