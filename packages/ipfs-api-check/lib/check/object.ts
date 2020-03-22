import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck, isBufferMaybe } from '../util';
import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';
import { IIPFSObjectApi } from 'ipfs-types/lib/ipfs/object';

export async function object(ipfs: IIPFSObjectApi)
{
	const multihash = 'QmPb5f92FxKPYdT3QNBd1GKiL4tZUXUrzF4Hkpdr3Gf1gK';

	const get = await runSubCheck(async () =>
	{
		const node = await ipfs.object.get(multihash, {
			timeout: 5000,
		})

		return node.size
	});

	const data = await runSubCheck(async () =>
	{
		const node = await ipfs.object.data(multihash, {
			timeout: 5000,
		})

		return isBufferMaybe(node)
	});

	const stat = await runSubCheck(async () =>
	{
		const node = await ipfs.object.stat(multihash, {
			timeout: 5000,
		})

		return node.Hash
	});

	return {
		get,
		data,
		stat,
	}
}

export default object
