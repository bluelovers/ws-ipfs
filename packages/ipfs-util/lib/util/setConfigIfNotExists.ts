import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import { IIPFSPromiseApi } from 'ipfs-types';

export type IConfigEntry = [string, IConfigEntryValue, IConfigEntryOptions?]

export type IConfigEntryValue = unknown | IConfigEntryValueFn;

export type IConfigEntryOptions = {
	filter?: IConfigEntryFilter,
}

export type IConfigEntryFilter = (oldValue: any, key: string, ipfs: IIPFSConfigApi) => boolean | PromiseLike<boolean>;

export type IConfigEntryValueFn = <T>(oldValue: T | unknown, key: string, ipfs: IIPFSPromiseApi) => T | PromiseLike<T>;

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

export function fillEntryIfNotExists<T extends any>(newValue: T[], opts?: {
	includesFn?: (value: T,
		index: string,
		oldValue: (T | unknown)[],
		key: string,
		ipfs: IIPFSConfigApi,
	) => boolean | PromiseLike<boolean>
})
{
	return <IConfigEntryValueFn>(async (oldValue: T[], key: string, ipfs: IIPFSConfigApi) =>
	{
		if (typeof oldValue === 'undefined' || oldValue === null)
		{
			return newValue
		}

		oldValue = oldValue || [];

		for (let index in newValue)
		{
			const value = newValue[index];

			if (opts?.includesFn)
			{
				if (!await opts.includesFn(value, index, oldValue, key, ipfs))
				{
					oldValue.push(value)
				}
			}
			else if (!await oldValue.includes(value))
			{
				oldValue.push(value)
			}
		}

		if (!oldValue.length)
		{
			return Promise.reject()
		}

		return oldValue
	})
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
