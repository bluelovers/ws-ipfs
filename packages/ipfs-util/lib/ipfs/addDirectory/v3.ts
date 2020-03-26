import { IIPFSFileApi, IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import { IGlobSourceOptions } from './types';
import globSource from 'ipfs-utils/src/files/glob-source';
import { IIPFSFilesApi } from 'ipfs-types/lib/ipfs/files';
import { normaliseInput } from '../../files/toFileObject';
import getStream from 'get-stream';
import deepFilesList, { ipfsFilesExists } from '../mfs/list';
import console from 'debug-color2/logger';

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

	const stream = globSource(targetDirPath, {
		recursive: true,
		...globSourceOptions,
	})

	let i = 0;
	let cid;

	ignoreExists = !!ignoreExists;

	for await (const entry of stream)
	{
		if (entry.content)
		{
			if (ignoreExists === true && await ipfsFilesExists(ipfs, entry.path))
			{
				console.gray.debug(entry.path)
				continue;
			}

			console.debug(entry.path)

			let buf = await getStream.buffer(entry.content)

			await ipfs.files.write(entry.path, buf, {
				create: true,
				parents: true,
				mode: entry.mode,
				mtime: entry.mtime,
			})

			i++;

			if ((i % 100) === 0)
			{
				const cid = await ipfs.files.flush()

				console.debug(cid.toString())
			}
		}
		else
		{
			console.debug(entry.path)
		}

	}

	cid = await ipfs.files.flush()

	return {
		targetDirPath,
		root: {
			cid,
		},
		files: {
			length: i,
		},
	}
}

export default addDirectoryToIPFS
