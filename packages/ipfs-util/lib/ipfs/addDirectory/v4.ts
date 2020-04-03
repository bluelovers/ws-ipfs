import { IIPFSFileApi, IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import { IGlobSourceOptions } from './types';
import globSource from 'ipfs-utils/src/files/glob-source';
import { IIPFSFilesApi } from 'ipfs-types/lib/ipfs/files';
import { normaliseInput } from '../../files/toFileObject';
import getStream from 'get-stream';
import deepFilesList, { ipfsFilesExists } from '../mfs/list';
import console from 'debug-color2/logger';
import FastGlob from '@bluelovers/fast-glob';
import path from 'path';
import { createReadStream, readFile } from 'fs-extra';

export async function addDirectoryToIPFS(ipfs: IIPFSFilesApi & IIPFSFilesApi, targetDirPath: string, {
	options,
	globSourceOptions,
	ignoreExists,
}: {
	options?: IIPFSFileApiAddOptions,
	globSourceOptions?: IGlobSourceOptions,
	ignoreExists?: boolean,
} = {})
{
	let i = 0;
	let cid;

	ignoreExists = !!ignoreExists;

	const rootPath = '/' + path.basename(targetDirPath) + '/';

	const files: {
		path: string,
	}[] = [];

	for await (let filename of FastGlob.stream([
		'**/*',
		//'**/*.txt',
	], {
		cwd: targetDirPath,
		onlyFiles: true,
		//deep: Infinity,
	}))
	{
		filename = filename.toString();

		//console.dir(filename)

		let entry = {
			path: rootPath + filename,
			// @ts-ignore
			//content: createReadStream(path.join(targetDirPath, filename)),
			mode: undefined,
			mtime: undefined,
		}

		if (ignoreExists === true && await ipfsFilesExists(ipfs, entry.path))
		{
			console.gray.debug(entry.path)
			continue;
		}

		console.debug(entry.path)

		let buf = await readFile(path.join(targetDirPath, filename))

		await ipfs.files.write(entry.path, buf, {
			create: true,
			parents: true,
			mode: entry.mode,
			mtime: entry.mtime,
		})

		files.push({
			path: entry.path,
		})

		i++;

		if ((i % 100) === 0)
		{
			const cid = await ipfs.files.flush()

			console.success(cid.toString())
		}

	}

	cid = await ipfs.files.flush()

	return {
		targetDirPath,
		root: {
			cid,
		},
		files,
	}
}

export default addDirectoryToIPFS
