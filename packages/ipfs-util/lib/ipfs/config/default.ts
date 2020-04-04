import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import configPubsub from './pubsub';
import { setConfigIfNotExists } from '../../util/setConfigIfNotExists';
import configApiCors from './cors';
import configApiSwarm from './swarm';
import configOthers from './other';

export async function configDefaultAll(ipfs: IIPFSConfigApi, skipCheck?: boolean)
{
	/**
	 * skip all config if can't pass
	 * @type {boolean}
	 */
	let skip: boolean;

	if (skipCheck !== true)
	{
		skip = await ipfs.config.get('Addresses.API')
			.then(e => false)
			.catch(e => true)
		;
	}

	if (skip)
	{
		return null
	}

	const ls: boolean[][] = [];
	const fns = [
		configOthers,
		configPubsub,
		configApiCors,
		configApiSwarm,
	];

	for (const fn of fns)
	{
		const bools = await fn(ipfs);
		ls.push(bools);
	}

	return ls
}

export default configDefaultAll
