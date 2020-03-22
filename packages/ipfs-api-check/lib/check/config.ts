import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck } from '../util';
import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import profiles from './config/profiles';

export async function config(ipfs: IIPFSConfigApi)
{
	let get = await runSubCheck(async () =>
	{
		const config = await ipfs.config.get('Addresses')

		return config;
	});

	return {
		get,
		profiles: await profiles(ipfs),
	}
}

export default config
