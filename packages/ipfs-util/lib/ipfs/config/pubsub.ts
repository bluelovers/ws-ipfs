import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import { setConfigIfNotExistsLazy } from '../../util/setConfigIfNotExists';

export function configPubsub(ipfs: IIPFSConfigApi)
{
	return setConfigIfNotExistsLazy(ipfs, [
		['Pubsub.Router', 'gossipsub', (oldValue: any) => !oldValue],
		['Pubsub.Enabled', true, (oldValue: any) => !oldValue],
		['relay.Pubsub.Enabled', true, (oldValue: any) => !oldValue],
	])
}

export default configPubsub
