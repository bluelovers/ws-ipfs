/**
 * Created by user on 2020/3/24.
 */
import { IIPFSFileApi, IIPFSFileApiAddReturnEntry, IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import globSource from 'ipfs-utils/src/files/glob-source';
import { StatsBase } from 'fs';

export async function addDirectoryToIPFS(ipfs: IIPFSFileApi, targetDirPath: string, {
	options,
	globSourceOptions,
}: {
	options?: IIPFSFileApiAddOptions,
	globSourceOptions?: {
		/**
		 * Recursively glob all paths in directories
		 */
		recursive?: boolean,
		/**
		 * Include .dot files in matched paths
		 */
		hidden?: boolean,
		/**
		 * Glob paths to ignore
		 */
		ignore?: string[],
		/**
		 * follow symlinks
		 */
		followSymlinks?: boolean,
		/**
		 * preserve mode
		 */
		preserveMode?: boolean,
		/**
		 * preserve mtime
		 */
		preserveMtime?: boolean,
		/**
		 * mode to use - if preserveMode is true this will be ignored
		 */
		mode?: StatsBase<any>["mode"],
		/**
		 * mtime to use - if preserveMtime is true this will be ignored
		 */
		mtime?: StatsBase<any>["mtime"],
	},
})
{
	let files: IIPFSFileApiAddReturnEntry[] = [];

	for await (const file of ipfs.add(globSource(targetDirPath, {
		recursive: true,
		...globSourceOptions,
	}), options))
	{
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
