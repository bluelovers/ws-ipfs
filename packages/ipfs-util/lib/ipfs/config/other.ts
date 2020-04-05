import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import { setConfigIfNotExistsLazy } from '../../util/setConfigIfNotExists';
import ipfsBootstrapList from 'ipfs-server-list/bootstrap';
import { array_unique } from 'array-hyper-unique';
import { IIPFSPromiseApi } from 'ipfs-types';
import ipfsApiType from 'ipfs-api-type';

export async function configOthers(ipfs: IIPFSConfigApi)
{
	const wss = '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star';
	const bs = array_unique(ipfsBootstrapList);

	const apiType = await ipfsApiType(ipfs as any)

	return setConfigIfNotExistsLazy(ipfs, [
		['Discovery.MDNS.Enabled', true],
		['Discovery.webRTCStar.Enabled', true],
		[
			'Addresses.Swarm', async (oldValue: string[], key, ipfs: IIPFSPromiseApi) =>
		{
			if (apiType === 'js')
			{
				oldValue = oldValue ?? [];

				if (!oldValue.includes(wss))
				{
					oldValue.push(wss)
				}
			}
			else
			{
				return Promise.reject(oldValue)
			}

			return oldValue
		},
			{
				filter(oldValue: string[])
				{
					return !oldValue?.includes(wss)
				},
			}
		],
		[
			'Bootstrap', (oldValue: string[]) =>
		{
			oldValue = oldValue ?? [];

			bs.forEach(addr => {
				if (!oldValue.includes(addr))
				{
					if (apiType !== 'js' && addr.includes('/wss/'))
					{
						return;
					}

					oldValue.push(addr)
				}
			});

			return oldValue
		},
			{
				filter()
				{
					return true
				},
			}
		],
		['Routing.Type', 'dht'],
		['Gateway.HTTPHeaders.Access-Control-Allow-Methods', [
			'HEAD',
			'GET'
		]],
		['Gateway.HTTPHeaders.Access-Control-Allow-Origin', [
			'*'
		]],
		['Gateway.HTTPHeaders.Access-Control-Allow-Headers', [
			'X-Requested-With',
			'Range',
			'User-Agent'
		]],
	])
}

export default configOthers
