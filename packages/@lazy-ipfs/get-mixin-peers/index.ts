import { IPFS } from 'ipfs-core-types';
import Bluebird from 'bluebird';
import { array_unique_overwrite } from 'array-hyper-unique';
import { AbortOptions } from 'ipfs-core-types/src/utils';

export async function ipfsPubsubPeers(ipfs: Pick<IPFS, 'pubsub'>, topic: string, options?: AbortOptions)
{
	options ??= {};
	options.timeout ??= 5000;

	return ipfs.pubsub.peers(topic, options)
}

export async function ipfsSwarmPeers(ipfs: Pick<IPFS, 'swarm'>, options?: AbortOptions)
{
	options ??= {};
	options.timeout ??= 5000;

	return ipfs.swarm.peers(options)
		.then(ls => ls.map(value =>
		{
			return value.peer
		}))
}

export async function ipfsSwarmAddrsPeers(ipfs: Pick<IPFS, 'swarm'>, options?: AbortOptions)
{
	options ??= {};
	options.timeout ??= 5000;

	return ipfs.swarm.addrs(options)
		.then(ls => ls.map(value =>
		{
			return value.id
		}))
}

export function ipfsMixinPeers(ipfs: Pick<IPFS, 'swarm' | 'pubsub'>, topic?: string, options?: AbortOptions)
{
	options ??= {};
	options.timeout ??= 5000;

	return Bluebird.props({
			pubsub: topic?.length && ipfsPubsubPeers(ipfs, topic, options).catch(e => [] as null),
			swarm: ipfsSwarmPeers(ipfs, options).catch(e => [] as null),
			addrs: ipfsSwarmAddrsPeers(ipfs, options).catch(e => [] as null),
		})
		.then(data =>
		{
			data.pubsub ??= [];
			data.swarm ??= [];
			data.addrs ??= [];

			return array_unique_overwrite([...data.pubsub, ...data.swarm, ...data.addrs].filter(Boolean).map(String))
		})
}
