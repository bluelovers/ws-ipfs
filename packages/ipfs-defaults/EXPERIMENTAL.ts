import { merge } from 'lodash';

export function mergeDefaultEXPERIMENTAL(EXPERIMENTAL = {})
{
	return merge({
		pubsub: true,
		ipnsPubsub: true,
		sharding: true,
		dht: true,
		FilestoreEnabled: true,
		Libp2pStreamMounting: false,
		P2pHttpProxy: false,
		PreferTLS: false,
		QUIC: true,
		ShardingEnabled: true,
		UrlstoreEnabled: true,
	}, EXPERIMENTAL)
}

export default mergeDefaultEXPERIMENTAL
