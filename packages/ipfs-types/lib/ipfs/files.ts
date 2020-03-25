/**
 * Created by user on 2020/3/25.
 */
import { ICIDValue, ICIDObject, IMtime } from '../types';
import { IApiOptions } from '../options';

export const enum EnumMutableFileSystemType
{
	FILE = 0,
	DIR = 1,
}

export const enum EnumMutableFileSystemTypeName
{
	FILE = 'file',
	DIR = 'directory',
}

export type IMutableFileSystemType = EnumMutableFileSystemType.FILE | EnumMutableFileSystemType.DIR | 0 | 1;

export type IMutableFileSystemTypeName = EnumMutableFileSystemTypeName.FILE | EnumMutableFileSystemTypeName.DIR | 'file' | 'directory';

export interface IMutableFileSystemFileObject
{
	name: string;
	type: IMutableFileSystemType;
	size: number;
	mode: number;
	cid: ICIDObject;
	mtime?: IMtime;
}

export interface IIPFSFilesApiCore
{
	chmod(path, mode, options?),

	cp(from, to, options?),

	mkdir(path, options?),

	read(path, options?),

	rm(paths, options?),

	stat(pathOrCID: ICIDValue, options?: IApiOptions<{
		hash?: boolean,
		size?: boolean,
		withLocal?: boolean,
	}>): Promise<{
		type: IMutableFileSystemTypeName,
		blocks: number,
		size: number,
		cumulativeSize: number,
		withLocality: boolean,
		mode: number,
		cid: ICIDObject
	}>,

	touch(path, options?),

	write(path, content, options?),

	mv(from, to, options?),

	flush(path?: string),

	ls(pathOrCID?: ICIDValue, options?: IApiOptions<{
		sort?: boolean,
	}>): AsyncIterable<IMutableFileSystemFileObject>,

}

export interface IIPFSFilesApi
{
	files: IIPFSFilesApiCore
}
