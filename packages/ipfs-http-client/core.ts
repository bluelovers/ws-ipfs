import { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
import { checkIPFS } from 'ipfs-util-lib';
import ipfsEnv from 'ipfs-env';

export { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses }

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

export function find(ipfsHttpModule: IIPFSClientFn)
{
	return async function findIpfsClient(ipfsServerList: IIPFSClientAddresses[], options: {
		skipCheck?: boolean,
		clientOptions?: any[],
	} = {})
	{
		return some(ipfsHttpModule, ipfsServerList
			.map(address => {
				return [address, ...options.clientOptions]
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
			const configs: IIPFSClientParameters[] = [];
			const { IPFS_ADDRESSES_API } = ipfsEnv();

			if (typeof IPFS_ADDRESSES_API === 'string' && IPFS_ADDRESSES_API.length)
			{
				configs.push([IPFS_ADDRESSES_API, ...argv]);
			}

			configs.push([{ port: '5001' }, ...argv]);
			configs.push([{ port: '5002' }, ...argv]);

			return some(ipfsHttpModule, configs)
		}

		return ipfsHttpModule(config, ...argv)
	}
}

export default use
