import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export type IConfigEntry = [string, IConfigEntryValue, IConfigEntryOptions?]

export type IConfigEntryValue = unknown | IConfigEntryValueFn;

export type IConfigEntryOptions = {
	filter?: IConfigEntryFilter,
}

export type IConfigEntryFilter = (oldValue: any, key: string, ipfs: IIPFSConfigApi) => boolean | PromiseLike<boolean>;

export type IConfigEntryValueFn = <T>(oldValue: T | unknown, key: string, ipfs: IIPFSConfigApi) => T | PromiseLike<T>;

export async function setConfigIfNotExistsLazy(ipfs: IIPFSConfigApi,
	entries: IConfigEntry[],
)
{
	const ls: boolean[] = [];

	for (const [key, value, options] of entries)
	{
		const bool = await setConfigIfNotExists(ipfs, key, value, options);
		ls.push(bool);
	}

	return ls
}

export async function setConfigIfNotExists(ipfs: IIPFSConfigApi,
	key: string,
	value: IConfigEntryValue,
	options?: IConfigEntryOptions,
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
			if (v === null || typeof v === 'undefined' || await options?.filter?.(v, key, ipfs))
			{
				if (typeof value === 'function')
				{
					value = await value(v, key, ipfs)
				}

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
