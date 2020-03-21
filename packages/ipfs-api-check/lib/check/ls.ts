import { IIPFSClientReturn } from '@bluelovers/ipfs-http-client';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { runSubCheck } from '../util';

export async function ls(ipfs: IIPFSFileApi)
{
	const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'

	return runSubCheck(async () =>
	{
		for await (const file of ipfs.ls(cid))
		{
			if (file.path === 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF/cat.gif')
			{
				return true
			}
		}
	})
		;
}

export default ls
