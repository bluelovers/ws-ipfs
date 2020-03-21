import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck } from '../util';

export async function id(ipfs: IIPFSApiUtils)
{
	return runSubCheck(async () =>
	{
		let data = await ipfs.id()
		return !!data.id;
	})
}

export default id
