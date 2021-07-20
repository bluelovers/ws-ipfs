import { IPFS } from 'ipfs-core-types';
import { IPFSPath } from 'ipfs-core-types/src/utils';
import { CpOptions } from 'ipfs-core-types/src/files';
import { dirname } from 'path/posix';

/**
 * @see https://github.com/ipfs/js-ipfs/issues/3747
 */
export async function ipfsFilesCopy(ipfs: IPFS, from: IPFSPath | IPFSPath[], to: string, options?: CpOptions)
{
	if (options?.parents)
	{
		const dir_path = dirname(to);

		await ipfs.files.mkdir(dir_path, options).catch(e => null);
	}

	return ipfs.files.cp(from, to, options)
}
