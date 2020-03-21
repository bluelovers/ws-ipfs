import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck } from '../util';
import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';
import { IIPFSRefsApi } from 'ipfs-types/lib/ipfs/refs';

export async function refs(ipfs: IIPFSRefsApi)
{
	const ipfsPath = '/ipfs/QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF';

	return await runSubCheck(async () =>
	{
		for await (const ref of ipfs.refs(ipfsPath, { recursive: true, timeout: 5000 }))
		{
			return ref?.ref
		}
	});
}

export default refs
