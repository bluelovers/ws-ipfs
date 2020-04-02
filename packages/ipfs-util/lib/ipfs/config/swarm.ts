import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import { setConfigIfNotExists, setConfigIfNotExistsLazy } from '../../util/setConfigIfNotExists';

export async function configApiSwarm(ipfs: IIPFSConfigApi)
{
	return setConfigIfNotExistsLazy(ipfs, [
		['Swarm.EnableAutoNATService', true],
		['Swarm.EnableAutoRelay', true],
		['Swarm.EnableRelayHop', true],
	])
}

export default configApiSwarm
