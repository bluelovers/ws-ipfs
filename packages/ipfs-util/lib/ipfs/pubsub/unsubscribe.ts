import { IIPFSPubsubApi } from 'ipfs-types/lib/ipfs/pubsub';
import Bluebird from 'bluebird';

export async function unsubscribeAll(ipfs: IIPFSPubsubApi)
{
	for (const topic of await ipfs.pubsub.ls())
	{
		await ipfs.pubsub.unsubscribe(topic).catch(e => null);
	}
}
