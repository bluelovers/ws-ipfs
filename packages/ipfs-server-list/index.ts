import { ITSRequireAtLeastOne, ITSPartialRecord } from 'ts-type'
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';

export type ILimit = ITSPartialRecord<'ref' | 'id' | 'config', boolean>;

export type IIPFSAddressesLike = ITSRequireAtLeastOne<{
	"API": IIPFSClientAddresses,
	"Gateway": string,
	limit?: ITSRequireAtLeastOne<ILimit>,
}>;

export function getIpfsServerList()
{
	let data = {
		/**
		 * http://blog.hubwiz.com/2019/09/11/infura-dev-manual/
		 * http://cw.hubwiz.com/card/c/infura-api/1/4/3/
		 * https://github.com/Pedro-vk/ipfs-website-deployer/blob/master/src/ipfs-website-deployer-cli.ts
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
	} as const;

	(<Record<string, IIPFSAddressesLike>>data);

	return data as Record<keyof typeof data, IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>
}

export const ipfsServerList = getIpfsServerList();

export default ipfsServerList
