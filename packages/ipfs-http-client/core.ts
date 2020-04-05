import {
	IIPFSClientFnWrap,
	IIPFSClientFn,
	IIPFSClientReturn,
	IIPFSClientParameters,
	IIPFSClientAddressesURL,
	IIPFSClientAddresses,
} from './lib/types';
import { checkIPFS } from 'ipfs-util-lib';
import { getDefaultServerList } from './util';

export { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses }

export { getDefaultServerList }

export async function some(ipfsClient: IIPFSClientFn, configs: IIPFSClientParameters[], skipCheck?: boolean): Promise<IIPFSClientReturn>
{
	let ipfs: IIPFSClientReturn;

	for (let argv of configs)
	{
		try
		{
			ipfs = ipfsClient(...argv);
			if (!skipCheck)
			{
				//await ipfs.id();
				await checkIPFS(ipfs)
			}
			break;
		}
		catch (e)
		{}
	}

	return ipfs
}

export function find(ipfsHttpModule: IIPFSClientFn): (ipfsServerList: IIPFSClientAddresses[], options?: {
	skipCheck?: boolean,
	clientArgvs?: any[],
}) => Promise<IIPFSClientReturn>
{
	return async function findIpfsClient(ipfsServerList: IIPFSClientAddresses[], options: {
		skipCheck?: boolean,
		clientArgvs?: any[],
	} = {}): Promise<IIPFSClientReturn>
	{
		let { clientArgvs = [] } = options;

		return some(ipfsHttpModule, ipfsServerList
			.filter(address => address)
			.map(address => {
				return [address, ...clientArgvs]
			}), options.skipCheck)
	}
}

export function use(ipfsHttpModule: IIPFSClientFn): IIPFSClientFnWrap
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

		return ipfsHttpModule(config, ...argv)
	}
}

export default use
