import { ITSRequireAtLeastOne, ITSPartialRecord } from 'ts-type'
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';

export type ILimit = ITSPartialRecord<'ref' | 'id' | 'config', boolean>;

export type IIPFSAddressesLike = ITSRequireAtLeastOne<{
	API?: IIPFSClientAddresses,
	Gateway?: string,
	IPLD?: string,
	IPNS?: string,
	/**
	 * https://blog.cloudflare.com/continuing-to-improve-our-ipfs-gateway/
	 *
	 * base32.cf-ipfs.com
	 */
	GatewayDomain?: string,
}> & {
	/**
	 * @deprecated
	 */
	limit?: ITSRequireAtLeastOne<ILimit>,
};

export function getIpfsServerList()
{
	let data = {
		/**
		 * http://blog.hubwiz.com/2019/09/11/infura-dev-manual/
		 * http://cw.hubwiz.com/card/c/infura-api/1/4/3/
		 * https://github.com/Pedro-vk/ipfs-website-deployer/blob/master/src/ipfs-website-deployer-cli.ts
		 * https://infura.io/docs/ipfs/get/version
		 */
		'infura.io': {
			API: {
				port: 5001,
				host: 'ipfs.infura.io',
				protocol: 'https',
			},
			Gateway: 'https://ipfs.infura.io/ipfs/',
			limit: {
				ref: false,
				id: false,
				config: false,
				ls: false,
			},
		},
		/**
		 * https://developers.cloudflare.com/distributed-web/ipfs-gateway/
		 */
		'cloudflare': {
			Gateway: 'https://cloudflare-ipfs.com/ipfs/',
			GatewayDomain: '.cf-ipfs.com',
		},
		'ipfs': {
			Gateway: 'https://ipfs.io/ipfs/',
			IPLD: 'https://explore.ipld.io/#/explore/',
			IPNS: 'https://ipfs.io/ipns/',
		},
	} as const;

	(<Record<string, IIPFSAddressesLike>>data);

	return data as Record<keyof typeof data, IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>
}

export function filterList<K extends keyof IIPFSAddressesLike>(key: K, serverList: Record<string, IIPFSAddressesLike> = ipfsServerList)
{
	return Object.keys(serverList)
		.reduce((a, b) => {

			if (serverList[b][key] != null)
			{
				a.push(serverList[b][key])
			}

			return a
		}, [] as IIPFSAddressesLike[K][])
}

export const ipfsServerList = getIpfsServerList();

export default ipfsServerList
