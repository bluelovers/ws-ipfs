import { stream as globStream } from '@bluelovers/fast-glob';
import { IIPFSFileApi, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { IGlobSourceOptions } from './types';
import { normaliseInput } from '../../files/toFileObject';
import globSource from 'ipfs-utils/src/files/glob-source';

export async function addDirectoryToIPFS(ipfs: IIPFSFileApi, targetDirPath: string, {
	options,
	globSourceOptions,
}: {
	options?: IIPFSFileApiAddOptions,
	globSourceOptions?: IGlobSourceOptions,
} = {})
{

	const stream = globSource(targetDirPath, {
		recursive: true,
		...globSourceOptions,
	})

	let files: IIPFSFileApiAddReturnEntry[] = [];
	let root: IIPFSFileApiAddReturnEntry;

	let i = 0;

	// @ts-ignore
	for await (const file of ipfs.add(stream, options))
	{
		if ((i++ % 100) === 0)
		{
			console.dir(file.path)
			console.log(file.cid.toString());
			//console.dir(root = file)
		}

		root = file;
	}

	return {
		targetDirPath,
		root,
		files: {
			length: i,
		},
	}
}

export default addDirectoryToIPFS
