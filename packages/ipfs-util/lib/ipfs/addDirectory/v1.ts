/**
 * Created by user on 2020/3/24.
 */
import { IIPFSFileApi, IIPFSFileApiAddReturnEntry, IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import globSource from 'ipfs-utils/src/files/glob-source';
import { IGlobSourceOptions } from './types';
import _addAll from '@lazy-ipfs/compatible-add';

export async function addDirectoryToIPFS(ipfs: IIPFSFileApi, targetDirPath: string, {
	options,
	globSourceOptions,
}: {
	options?: IIPFSFileApiAddOptions,
	globSourceOptions?: IGlobSourceOptions,
} = {})
{
	let files: IIPFSFileApiAddReturnEntry[] = [];

	// @ts-ignore
	for await (const file of _addAll(ipfs, globSource(targetDirPath, {
		recursive: true,
		...globSourceOptions,
	}), options))
	{
		console.log(file)
		files.push(file);
	}

	const root = files[files.length - 1]

	return {
		targetDirPath,
		root,
		files,
	}
}

export default addDirectoryToIPFS
