import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { runSubCheck } from '../util';
import _addAll from '@lazy-ipfs/compatible-add';

export async function add(ipfs: IIPFSFileApi)
{
	const file = {
		path: 'myfile.txt',
		content: 'ABC',
	}

	return runSubCheck(async () =>
	{
		for await (const result of _addAll(ipfs, file, {
			timeout: 5000,
			pin: false,
		}))
		{
			if (result.path === file.path && result.size)
			{
				return true
			}
		}
	})
		;
}

export default add
