import {
	IIPFSClientFnWrap,
	IIPFSClientFn,
	IIPFSClientReturn,
	IIPFSClientParameters,
	IIPFSClientAddressesURL,
	IIPFSClientAddresses,
} from './lib/types';
import { getDefaultServerList } from './util';
import { IPFS } from 'ipfs-core-types';
import _ipfsHttpModule from 'ipfs-http-client'
import { ITSResolvable } from 'ts-type/lib/generic';
import { checkIPFS } from '@lazy-ipfs/check-ipfs-connect';

export { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses }

export { getDefaultServerList }

export function getCreateClientFn(ipfsClient: any): IIPFSClientFn
{
	if (typeof ipfsClient.create === 'function')
	{
		return ipfsClient.create
	}
	else if (typeof ipfsClient === 'function')
	{
		return ipfsClient
	}

	throw new TypeError(`${ipfsClient} is not import('ipfs-http-client')`)
}

export async function some(ipfsClient: IIPFSClientFn | typeof _ipfsHttpModule, configs: IIPFSClientParameters[], skipCheck?: boolean, checkIPFSFn?: (ipfs: IPFS) => ITSResolvable<boolean>): Promise<IIPFSClientReturn>
{
	let ipfs: IIPFSClientReturn;

	const create = getCreateClientFn(ipfsClient)

	// @ts-ignore
	checkIPFSFn ??= checkIPFS;

	for (let argv of configs)
	{
		try
		{
			ipfs = await create(...argv);
			if (!skipCheck)
			{
				// @ts-ignore
				if (await checkIPFSFn(ipfs)?.catch(e => null))
				{
					break;
				}

				ipfs = null
			}
		}
		catch (e)
		{}
	}

	return ipfs
}

export function find(ipfsHttpModule: IIPFSClientFn | typeof _ipfsHttpModule): (ipfsServerList: IIPFSClientAddresses[], options?: {
	skipCheck?: boolean,
	clientArgvs?: any[],
	checkIPFSFn?(ipfs: IPFS): ITSResolvable<boolean>,
}) => Promise<IIPFSClientReturn>
{
	return async function findIpfsClient(ipfsServerList: IIPFSClientAddresses[], options: {
		skipCheck?: boolean,
		clientArgvs?: any[],
		checkIPFSFn?(ipfs: IPFS): ITSResolvable<boolean>,
	} = {}): Promise<IIPFSClientReturn>
	{
		let { clientArgvs = [] } = options;

		return some(ipfsHttpModule, ipfsServerList
			.filter(address => address)
			.map(address => {
				return [address, ...clientArgvs]
			}), options.skipCheck, options.checkIPFSFn)
	}
}

export function use(ipfsHttpModule: IIPFSClientFn | typeof _ipfsHttpModule): IIPFSClientFnWrap
{
	return async function ipfsClient(...argvs: IIPFSClientParameters): Promise<IIPFSClientReturn>
	{
		const [config, ...argv] = argvs;

		if (typeof config === 'undefined' || config === null)
		{
			return find(ipfsHttpModule)(getDefaultServerList(), {
				clientArgvs: argv,
			})
		}

		return getCreateClientFn(ipfsHttpModule)(config, ...argv)
	}
}

export default use
