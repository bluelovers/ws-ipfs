import { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
import { checkIPFS } from 'ipfs-util-lib';

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

export function use(ipfsHttpModule: IIPFSClientFn): IIPFSClientFnWrap
{
	return async function ipfsClient(...argvs: IIPFSClientParameters): Promise<IIPFSClientReturn>
	{
		let [config, ...argv] = argvs;

		if (typeof config === 'undefined' || config === null)
		{
			let configs: IIPFSClientParameters[] = [];

			if (typeof process !== 'undefined' && typeof process.env.IPFS_ADDRESSES_API === 'string')
			{
				configs.push([process.env.IPFS_ADDRESSES_API, ...argv]);
			}

			configs.push([{ port: '5001' }, ...argv]);
			configs.push([{ port: '5002' }, ...argv]);

			return some(ipfsHttpModule, configs)
		}

		return ipfsHttpModule(config, ...argv)
	}
}

export default use
