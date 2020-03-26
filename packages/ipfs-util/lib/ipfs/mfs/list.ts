/**
 * Created by user on 2020/3/25.
 */
import {
	IIPFSFilesApi,
	IMutableFileSystemFileObject,
	EnumMutableFileSystemType,
	EnumMutableFileSystemTypeName, IMutableFileSystemType,
} from 'ipfs-types/lib/ipfs/files';
import { ITSResolvable } from 'ts-type';
import micromatch from 'micromatch';
import { posix as path } from 'path';

export function mfsFileType(type: EnumMutableFileSystemType | EnumMutableFileSystemTypeName | string | number): IMutableFileSystemType
{
	if (type === EnumMutableFileSystemType.FILE || type === EnumMutableFileSystemTypeName.FILE)
	{
		return EnumMutableFileSystemType.FILE
	}
	else if (type === EnumMutableFileSystemType.DIR || type === EnumMutableFileSystemTypeName.DIR)
	{
		return EnumMutableFileSystemType.DIR
	}

	throw new TypeError(`unknown file type: ${type}, ${typeof type}`)

	return type as any
}

export function fixDirPath(dir: string)
{
	return fixMarkDirectories(fixPath(dir))
}

export function fixPath(dir: string)
{
	dir = dir.replace(/\\/g, '/')
	return dir
}

export function fixMarkDirectories(dir: string)
{
	if (!dir.endsWith('/'))
	{
		dir += '/';
	}
	return dir
}

export function isNull(value): value is void
{
	return typeof value === 'undefined' || value === null
}

export async function* deepFilesListCore(ipfs: IIPFSFilesApi, rootPath: string, options: {
	prefix?: string,
	deep?: number,
	level?: number,
} = {}): AsyncGenerator<IMutableFileSystemFileObject, void>
{
	const { prefix = '', deep = 0, level = 0 } = options;

	for await (const file of ipfs.files.ls(rootPath))
	{
		if (prefix !== '')
		{
			file.name = prefix + '/' + file.name;
		}

		yield file;

		if (file.type === EnumMutableFileSystemType.DIR)
		{
			if (level >= deep)
			{
				continue;
			}

			yield* deepFilesListCore(ipfs, rootPath + file.name, {
				prefix: file.name,
				level: level + 1,
			});
		}
	}
}

export async function ipfsFilesExists(ipfs: IIPFSFilesApi, targetPath: string)
{
	let cwd = path.dirname(targetPath);

	let stat = await ipfs.files.stat(targetPath, {
		timeout: 1000,
	}).catch(e => null);

	if (stat)
	{
		if (mfsFileType(stat.type) === EnumMutableFileSystemType.FILE)
		{
			return true
		}

		//console.dir(stat)

		for await (const file of deepFilesList(ipfs, {
			cwd,
			onlyFiles: true,
			recursive: false,
			absolute: true,
		}))
		{
			//console.dir(file);

			if (mfsFileType(file.type) === EnumMutableFileSystemType.FILE && file.name === targetPath)
			{
				return true
			}
		}
	}

	return false
}

export async function* deepFilesList(ipfs: IIPFSFilesApi, options: {
	cwd?: string,
	globPattern?: string[],
	globOptions?: micromatch.Options,
	filter?(file: IMutableFileSystemFileObject): ITSResolvable<boolean>,
	onlyDirectories?: boolean,
	onlyFiles?: boolean,
	absolute?: boolean,
	markDirectories?: boolean,
	deep?: number,
	recursive?: boolean,
} = {})
{
	const rootPath = fixDirPath(options?.cwd || '/');
	let { globPattern, globOptions, filter, onlyFiles, absolute, markDirectories, deep, recursive } = options;

	if (options?.onlyDirectories)
	{
		if (onlyFiles)
		{
			throw new TypeError(`onlyDirectories, onlyFiles can't be set at same time`)
		}
		else
		{
			onlyFiles = false;
		}
	}
	else if (isNull(onlyFiles))
	{
		onlyFiles = true;
	}

	onlyFiles = !!onlyFiles;
	absolute = !!absolute;
	const hasFilter = !isNull(filter);
	markDirectories = !!markDirectories;
	recursive = !!(recursive ?? (deep ?? true));

	if (!recursive)
	{
		deep = 0;
	}

	if (typeof deep !== 'number')
	{
		if (typeof deep === 'string')
		{
			deep = parseInt(deep)
		}
		else if (typeof deep === 'boolean' || isNull(deep))
		{
			deep = recursive ? Infinity : 0;
		}
	}
	if (deep < 0)
	{
		deep = Infinity;
	}

	if (globPattern?.length === 0)
	{
		throw new TypeError(`globPattern.length should not 0`)
	}

	for await (const file of deepFilesListCore(ipfs, rootPath, {
		deep,
	}))
	{
		const isDir = file.type === EnumMutableFileSystemType.DIR;

		if (onlyFiles === true && isDir)
		{
			continue;
		}

		const absPath = rootPath + file.name;

		if (globPattern && !micromatch.isMatch(absPath, globPattern, globOptions))
		{
			continue;
		}

		if (absolute === true)
		{
			file.name = absPath;
		}

		if (markDirectories === true && isDir === true)
		{
			file.name = fixMarkDirectories(file.name)
		}

		if (hasFilter === true && !filter(file))
		{
			continue;
		}

		yield file
	}
}

export default deepFilesList
