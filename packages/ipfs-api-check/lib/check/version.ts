import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck } from '../util';

export async function version(ipfs: IIPFSApiUtils)
{
	return runSubCheck(async () =>
	{
		let data = await ipfs.version()
		return !!data.version;
	})
}

export default version
