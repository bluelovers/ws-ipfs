import _ipfsHttpModule from 'ipfs-http-client'

export type IIPFSClientParameters = Parameters<typeof _ipfsHttpModule>
export type IIPFSClientReturn = ReturnType<typeof _ipfsHttpModule>
export type IIPFSClientFn = (...argvs: IIPFSClientParameters) => IIPFSClientReturn
export type IIPFSClientFnWrap = (...argvs: IIPFSClientParameters) => Promise<IIPFSClientReturn>

export async function some(ipfsClient: IIPFSClientFn, configs: IIPFSClientParameters[]): Promise<IIPFSClientReturn>
{
	let ipfs: IIPFSClientReturn;

	for (let argv of configs)
	{
		try
		{
			// @ts-ignore
			ipfs = ipfsClient(...argv);
			await ipfs.id();
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

		if (config == null)
		{
			let configs: Parameters<typeof _ipfsHttpModule>[] = [];

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
