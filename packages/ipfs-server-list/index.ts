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

	btfsGateway?: string,
}> & {
	/**
	 * @deprecated
	 */
	limit?: ITSRequireAtLeastOne<ILimit>,

	name?: string,
	description?: string,
};

export function getIpfsServerList()
{
	/**
	 * @see https://ipfs.github.io/public-gateway-checker/
	 */
	let data = {
		'ipfs': {
			Gateway: 'https://ipfs.io/ipfs/',
			IPLD: 'https://explore.ipld.io/#/explore/',
			IPNS: 'https://ipfs.io/ipns/',
		},
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
		'cloudflare.2': {
			GatewayDomain: '.ipfs.cf-ipfs.com',
		},
		'ipfs.gateway': {
			Gateway: 'https://gateway.ipfs.io/ipfs/',
		},
		'dweb': {
			GatewayDomain: '.ipfs.dweb.link',
		},
		/**
		 * https://fleek.co/
		 */
		'fleek': {
			Gateway: 'https://ipfs.fleek.co/ipfs/',
			IPNS: 'https://ipfs.fleek.co/ipns/',
			GatewayDomain: '.on.fleek.co',
		},
		'bdaily': {
			Gateway: 'https://gateway.bdaily.club/ipfs/',
		},
		'globalupload': {
			Gateway: 'https://ipfs.globalupload.io/',
		},
		'pinata': {
			Gateway: 'https://gateway.pinata.cloud/ipfs/',
		},
		'hardbin': {
			Gateway: 'https://hardbin.com/ipfs/',
		},
		'eternum': {
			Gateway: 'https://ipfs.eternum.io/ipfs/',
		},
		'temporal': {
			Gateway: 'https://gateway.temporal.cloud/ipfs/',
		},
		'sloppyta': {
			Gateway: 'https://ipfs.sloppyta.co/ipfs/',
		},
		'greyh': {
			Gateway: 'https://ipfs.greyh.at/ipfs/',
		},
		'jorropo': {
			Gateway: 'https://jorropo.ovh/ipfs/',
		},
		'jeroendeneef': {
			Gateway: 'https://ipfs.jeroendeneef.com/ipfs/',
		},
		'2read': {
			GatewayDomain: '.ipfs.2read.net',
			Gateway: 'https://ipfs.2read.net/ipfs/',
		},
		'runfission': {
			Gateway: 'https://ipfs.runfission.com/ipfs/',
		},
		'best-practice': {
			Gateway: 'https://ipfs.best-practice.se/ipfs/',
		},
		'privacytools': {
			Gateway: 'https://ipfs.privacytools.io/ipfs/',
		},
		'trusti': {
			Gateway: 'https://trusti.id/ipfs/',
		},
		'stibarc': {
			Gateway: 'https://ipfs.stibarc.com/ipfs/',
		},
		'dtube': {
			name: 'DTube',

			Gateway: 'https://snap1.d.tube/ipfs/',
			btfsGateway: 'https://player.d.tube/btfs/',
		},
		'dtube.2': {
			name: 'DTube',

			btfsGateway: 'https://sprite.d.tube/btfs/',
		},
		'cosmos-ink': {
			GatewayDomain: '.ipfs.cosmos-ink.net',
		},
		'storjipfs-gateway': {
			Gateway: 'https://storjipfs-gateway.com/ipfs/',
		},
		'permaweb': {
			Gateway: 'https://permaweb.io/ipfs/',
		},
		'cwinfo': {
			Gateway: 'https://cdn.cwinfo.net/ipfs/',
		},
		'fooock': { Gateway: 'https://ipfs.fooock.com/ipfs/' },
		'serph.network': { Gateway: 'https://gateway.serph.network/ipfs/' },
		'busy.org': { Gateway: 'https://ipfs.busy.org/ipfs/' },
		'doolta': { Gateway: 'https://ipfs.doolta.com/ipfs/' },
		'originprotocol': { Gateway: 'https://gateway.originprotocol.com/ipfs/' },
		'mrh.io': { Gateway: 'https://ipfs.mrh.io/ipfs/' },
		'ipns.co': { Gateway: 'https://ipns.co/' },
		'blocksec': { Gateway: 'https://gateway.blocksec.com/ipfs/' },
		'10.via0.com': { Gateway: 'https://10.via0.com/ipfs/' },
		'ninetailed.ninja': { Gateway: 'https://ninetailed.ninja/ipfs/' },
	} as const;

	(<Record<string, IIPFSAddressesLike>>data);

	return data as Record<keyof typeof data, IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>
}

export function getIpfsLocalList()
{
	let data = {
		'go-ipfs': {
			API: {
				port: 5001,
			},
		},
		'js-ipfs': {
			API: {
				port: 5002,
			},
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
