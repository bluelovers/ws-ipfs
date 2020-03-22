import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils, IIPFSAsyncIterableApi } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck } from '../util';

export async function ping(ipfs: IIPFSAsyncIterableApi)
{
	return runSubCheck(async () =>
	{
		const count = 3
		const peerId = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
		for await (const res of ipfs.ping(peerId, {
			timeout: 5000,
			count,
		}))
		{
			if (res.time)
			{
				//console.log(`Pong received: time=${res.time} ms`)
			}
			else
			{
				//console.log(res.text)
			}
			return true
		}
	})
}

export default ping
