import TypedArray = NodeJS.TypedArray;
import { INetworkOptionsBase } from '../options';

export type IBytes = number[]
	| Buffer
	| ArrayBuffer
	| TypedArray;

export type IBloby = Blob | File;

export type IBufferList = Buffer[];

export type IFileContent = IBytes
	| IBloby
	| string
	| Iterable<number>
	| IAsyncIterableAble<IBytes>
;

export type IAsyncIterableAble<T> = Iterable<T> | AsyncIterable<T>

export type IAsyncIterableAbleOrValue<T> = T | IAsyncIterableAble<T>;

export type IUnixTime = Date | { secs: number, nsecs?: number } | number[];

export interface IFileObject
{
	// The path you want to the file to be accessible at from the root CID _after_ it has been added
	path?: string
	// The contents of the file (see below for definition)
	content?: IFileContent
	// File mode to store the entry with (see https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation)
	mode?: number | string
	// The modification time of the entry (see below for definition)
	mtime?: IUnixTime
}

export type IFileData = IAsyncIterableAbleOrValue<IFileObject>
	| IAsyncIterableAbleOrValue<IBloby>
	| IAsyncIterableAbleOrValue<IBytes>
	| IAsyncIterableAbleOrValue<string>
	| Iterable<number>
	;

export interface IMtime
{
	secs: number;
	nsecs: number;
}

export interface IIPFSFileApi
{
	add(data: IFileData, options?): AsyncIterable<{
		path: '/tmp/myfile.txt',
		cid,
		mode: number,
		mtime: IMtime,
		size: number
	}>

	cat(ipfsPath, options?: {
		offset?: number,
		length?: number,
	} & INetworkOptionsBase): AsyncIterable<Buffer>

	get(ipfsPath, options?): AsyncIterable<{
		path: string,
		content: AsyncIterable<IBufferList>,
		mode: number,
		mtime: IMtime
	}>

	ls(ipfsPath): AsyncIterable<{
		depth: number,
		name: string,
		path: string,
		size: number,
		cid,
		type: 'file' | string,
		mode: number,
		mtime: IMtime
	}>

}
