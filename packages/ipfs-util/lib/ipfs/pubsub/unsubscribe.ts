import { IIPFSPubsubApi } from 'ipfs-types/lib/ipfs/pubsub';
import Bluebird from 'bluebird';

export function unsubscribeAll(ipfs: IIPFSPubsubApi)
{
	return Bluebird.mapSeries(ipfs.pubsub.ls(), (topic) => {
		return ipfs.pubsub.unsubscribe(topic)
	})
}
