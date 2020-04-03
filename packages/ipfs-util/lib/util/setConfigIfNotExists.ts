import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export type IConfigEntry = [string, any, IConfigEntryFilter?]

export type IConfigEntryFilter = (oldValue, key: string, ipfs: IIPFSConfigApi) => boolean | PromiseLike<boolean>;

export async function setConfigIfNotExistsLazy(ipfs: IIPFSConfigApi,
	entries: IConfigEntry[],
)
{
	const ls: boolean[] = [];

	for (const [key, value, filter] of entries)
	{
		const bool = await setConfigIfNotExists(ipfs, key, value, filter);
		ls.push(bool);
	}

	return ls
}

export async function setConfigIfNotExists(ipfs: IIPFSConfigApi,
	key: string,
	value,
	filter?: IConfigEntryFilter,
)
{
	let v;
	let bool: boolean;
	try
	{
		v = await ipfs.config.get(key)

		bool = false;
	}
	catch (e)
	{

	}
	finally
	{
		try
		{
			if (v === null || typeof v === 'undefined' || await filter?.(v, key, ipfs))
			{
				await ipfs.config.set(key, value)
				bool = true;
			}
		}
		catch (e)
		{

		}
	}

	return bool
}

export default setConfigIfNotExistsLazy
