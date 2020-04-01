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

export function getDefaultServerList()
{
	const ipfsServerList: IIPFSClientAddresses[] = [];
	const { IPFS_ADDRESSES_API } = ipfsEnv();

	if (typeof IPFS_ADDRESSES_API === 'string' && IPFS_ADDRESSES_API.length)
	{
		ipfsServerList.push(IPFS_ADDRESSES_API);
	}

	ipfsServerList.push({ port: '5001' });
	ipfsServerList.push({ port: '5002' });

	return ipfsServerList
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
		return some(ipfsHttpModule, ipfsServerList
			.map(address => {
				return [address, ...options.clientArgvs]
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
