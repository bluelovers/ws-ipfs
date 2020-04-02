import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export async function setConfigIfNotExistsLazy(ipfs: IIPFSConfigApi, entries: [string, any][])
{
	const ls: boolean[] = [];

	for (const [key, value] of entries)
	{
		const bool = await setConfigIfNotExists(ipfs, key, value);
		ls.push(bool);
	}

	return ls
}

export async function setConfigIfNotExists(ipfs: IIPFSConfigApi, key: string, value)
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
			if (v == null)
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
