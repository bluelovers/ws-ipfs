import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import { setConfigIfNotExistsLazy } from '../../util/setConfigIfNotExists';

export function configPubsub(ipfs: IIPFSConfigApi)
{
	const options = {
		filter: (oldValue: any) => !oldValue
	}

	return setConfigIfNotExistsLazy(ipfs, [
		['Pubsub.Router', 'gossipsub', options],
		['Pubsub.Enabled', true, options],
		['relay.Pubsub.Enabled', true, options],
	])
}

export default configPubsub
