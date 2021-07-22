import { ITSRequireAtLeastOne, ITSPartialRecord } from 'ts-type'
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';

export type ILimit = ITSPartialRecord<'ref' | 'id' | 'config', boolean>;

export type IIPFSAddressesLikeBase = {
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
	IPNSDomain?: string,

	btfsGateway?: string,
}

export type IIPFSAddressesLike = ITSRequireAtLeastOne<IIPFSAddressesLikeBase> & {
	/**
	 * @deprecated
	 */
	limit?: ITSRequireAtLeastOne<ILimit>,

	name?: string,
	description?: string,

	disable?: ITSPartialRecord<keyof IIPFSAddressesLikeBase, boolean>
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
			/**
			 * https://blog.infura.io/ipfs-0-5-is-here-with-a-new-improved-gateway/
			 */
			GatewayDomain: '.ipfs.infura-ipfs.io',
			limit: {
				ref: false,
				id: false,
				config: false,
				ls: false,
			},
		},
		'infura-ipfs.io': {
			Gateway: 'https://infura-ipfs.io/ipfs/',
		},
		/**
		 * https://developers.cloudflare.com/distributed-web/ipfs-gateway/
		 */
		'cloudflare': {
			Gateway: 'https://cloudflare-ipfs.com/ipfs/',
			GatewayDomain: '.ipfs.cf-ipfs.com',
		},
		'cloudflare-ipfs': {
			Gateway: 'https://cf-ipfs.com/ipfs/',
		},
		'ipfs.gateway': {
			Gateway: 'https://gateway.ipfs.io/ipfs/',
		},
		'dweb': {
			Gateway: 'https://dweb.link/ipfs/',
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
			disable: {
				Gateway: true,
			},
		},
		'globalupload': {
			Gateway: 'https://ipfs.globalupload.io/',
			disable: {
				Gateway: true,
			},
		},
		'pinata': {
			Gateway: 'https://gateway.pinata.cloud/ipfs/',
		},
		'hardbin': {
			Gateway: 'https://hardbin.com/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'eternum': {
			Gateway: 'https://ipfs.eternum.io/ipfs/',
			IPNS: 'https://ipfs.eternum.io/ipns/',
			disable: {
				Gateway: true,
			},
		},
		'temporal': {
			Gateway: 'https://gateway.temporal.cloud/ipfs/',
			IPNS: 'https://gateway.temporal.cloud/ipns/',
			disable: {
				Gateway: true,
			},
		},
		'greyh': {
			Gateway: 'https://ipfs.greyh.at/ipfs/',
		},
		'jorropo.net': {
			Gateway: 'https://jorropo.net/ipfs/',
		},
		'jeroendeneef': {
			Gateway: 'https://ipfs.jeroendeneef.com/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'2read': {
			GatewayDomain: '.ipfs.2read.net',
			Gateway: 'https://ipfs.2read.net/ipfs/',
			disable: {
				GatewayDomain: true,
				Gateway: true,
			},
		},
		'runfission': {
			Gateway: 'https://ipfs.runfission.com/ipfs/',
		},
		'best-practice': {
			Gateway: 'https://ipfs.best-practice.se/ipfs/',
		},
		'trusti': {
			Gateway: 'https://trusti.id/ipfs/',
			disable: {
				Gateway: true,
			},
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
			disable: {
				GatewayDomain: true,
			},
		},
		'cwinfo': {
			Gateway: 'https://cdn.cwinfo.net/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'doolta': {
			Gateway: 'https://ipfs.doolta.com/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'originprotocol': {
			Gateway: 'https://gateway.originprotocol.com/ipfs/',
		},
		'mrh.io': {
			Gateway: 'https://ipfs.mrh.io/ipfs/',
		},
		'ipns.co': {
			Gateway: 'https://ipns.co/',
			disable: {
				Gateway: true,
			},
		},
		'blocksec': {
			Gateway: 'https://gateway.blocksec.com/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'10.via0.com': {
			Gateway: 'https://10.via0.com/ipfs/',
		},
		'ninetailed.ninja': {
			Gateway: 'https://ninetailed.ninja/ipfs/',
		},
		'geesome-node': {
			description: `https://github.com/galtproject/geesome-node`,
			Gateway: 'https://geesome-node.galtproject.io:7722/ipfs/',
			IPNS: 'https://geesome-node.galtproject.io:7722/ipns/',
			disable: {
				Gateway: true,
			},
		},
		'ipfs.yt': {
			Gateway: 'https://ipfs.yt/ipfs/',
		},
		'overpi': {
			Gateway: 'https://ipfs.overpi.com/ipfs/',
		},
		'adatools.io': {
			Gateway: 'https://ipfs.adatools.io/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'drink.cafe': {
			Gateway: 'https://ipfs.drink.cafe/ipfs/',
		},
		'robotizing.net': {
			Gateway: 'https://robotizing.net/ipfs/',
		},
		'mihir.ch': {
			Gateway: 'https://ipfs.mihir.ch/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'telos.miami': {
			Gateway: 'https://ipfs.telos.miami/ipfs/',
		},
		'tubby.cloud': {
			Gateway: 'https://ipfs.tubby.cloud/ipfs/',
		},
		'kaleido.art': {
			Gateway: 'https://ipfs.kaleido.art/ipfs/',
		},
		'3cloud.ee': {
			Gateway: 'https://3cloud.ee/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'crustwebsites.net': {
			Gateway: 'https://crustwebsites.net/ipfs/',
		},
		'textile.io': {
			Gateway: 'https://hub.textile.io/ipfs/',
		},
		'itargo.io': {
			Gateway: 'https://ipfs.itargo.io/ipfs/',
		},
		'decoo.io': {
			Gateway: 'https://ipfs.decoo.io/ipfs/',
		},
		'denarius.io': {
			Gateway: 'https://ipfs.denarius.io/ipfs/',
		},
		'jbb.one': {
			Gateway: 'https://ipfs.jbb.one/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'ravencoinipfs-gateway.com': {
			Gateway: 'https://ravencoinipfs-gateway.com/ipfs/',
		},
		'trusted-setup.filecoin.io': {
			Gateway: 'https://trusted-setup.filecoin.io/ipfs/',
		},
		'eth.aragon.network': {
			Gateway: 'https://ipfs.eth.aragon.network/ipfs/',
		},
		'bluelight.link': {
			Gateway: 'https://bluelight.link/ipfs/',
		},
		'birds-are-nice.me': {
			Gateway: 'https://birds-are-nice.me/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'smartholdem.io': {
			Gateway: 'https://ipfs.smartholdem.io/ipfs/',
		},
		'astyanax.io': {
			Gateway: 'https://astyanax.io/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'azurewebsites.net': {
			Gateway: 'https://ipfs.azurewebsites.net/ipfs/',
			disable: {
				Gateway: true,
			},
		},
		'slang.cx': {
			Gateway: 'https://ipfs.slang.cx/ipfs/',
		},
		'video.oneloveipfs.com': {
			Gateway: 'https://video.oneloveipfs.com/ipfs/',
		},
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

export function filterList<K extends keyof IIPFSAddressesLikeBase>(key: K,
	serverList: Record<string, IIPFSAddressesLike> = ipfsServerList,
)
{
	return Object.keys(serverList)
		.reduce((a, b) =>
		{
			if (serverList[b][key] != null && !isDisabled(serverList[b], key))
			{
				a.push(serverList[b][key])
			}

			return a
		}, [] as IIPFSAddressesLike[K][])
}

export function isDisabled<T extends IIPFSAddressesLike>(data: T, key: keyof IIPFSAddressesLikeBase)
{
	return data.disable?.[key]
}

export const ipfsServerList = getIpfsServerList();

export default ipfsServerList
