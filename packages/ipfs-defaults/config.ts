import { defaultsDeep, merge, uniq } from 'lodash'
import ipfsBootstrapList from 'ipfs-server-list/bootstrap';
import mergeDefaultEXPERIMENTAL from './EXPERIMENTAL';

export function mergeDefaultConfig(config = {})
{
	return merge({
		API: {
			HTTPHeaders: {
				'Access-Control-Allow-Methods': [
					'HEAD',
					'PUT',
					'GET',
					'POST',
				],
			},
		},
		Addresses: {
			Swarm: [
				'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
			],
		},
		Discovery: {
			MDNS: {
				Enabled: true,
				Interval: 10,
			},
			webRTCStar: {
				Enabled: true,
			},
		},
		Gateway: {
			'HTTPHeaders': {
				'Access-Control-Allow-Methods': [
					'HEAD',
					'GET'
				],
			},
		},
		EXPERIMENTAL: mergeDefaultEXPERIMENTAL(),
		Bootstrap: uniq(ipfsBootstrapList),
		Pubsub: {
			Router: 'gossipsub',
			Enabled: true,
		},
		Swarm: {
			ConnMgr: {
				LowWater: 200,
				HighWater: 500,
			},
			EnableAutoNATService: true,
			EnableAutoRelay: true,
			EnableRelayHop: true,
		},
		'Routing': {
			'Type': 'dht'
		},
	}, defaultsDeep(config, {
		API: {
			HTTPHeaders: {
				'Access-Control-Allow-Credentials': [
					'true',
				],
				'Access-Control-Allow-Headers': [
					'Authorization',
				],
				'Access-Control-Allow-Methods': [
					'HEAD',
					'PUT',
					'GET',
					'POST',
				],
				'Access-Control-Allow-Origin': [
					'*',
				],
				'Access-Control-Expose-Headers': [
					'Location',
				],
			},
		},
		Gateway: {
			'HTTPHeaders': {
				'Access-Control-Allow-Headers': [
					'X-Requested-With',
					'Range',
					'User-Agent'
				],
				'Access-Control-Allow-Origin': [
					'*'
				]
			},
		},
	}))
}

export default mergeDefaultConfig