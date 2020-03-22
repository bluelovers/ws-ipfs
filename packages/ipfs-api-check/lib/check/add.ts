import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { runSubCheck } from '../util';

export async function add(ipfs: IIPFSFileApi)
{
	const file = {
		path: 'myfile.txt',
		content: 'ABC',
	}

	return runSubCheck(async () =>
	{
		for await (const result of ipfs.add(file, {
			timeout: 5000,
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
