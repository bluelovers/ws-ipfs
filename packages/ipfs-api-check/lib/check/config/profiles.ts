import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck } from '../../util';
import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export async function profiles(ipfs: IIPFSConfigApi)
{
	let list = await runSubCheck(async () =>
	{
		const profiles = await ipfs.config.profiles.list()

		return profiles;
	});

	let apply = await runSubCheck(async () =>
	{
		const diff = await ipfs.config.profiles.apply('lowpower', {
			dryRun: true,
		})

		return diff.original && diff.updated;
	});

	return {
		list,
		apply,
	}
}

export default profiles
