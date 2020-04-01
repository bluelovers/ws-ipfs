import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export async function _setIfNotExists(ipfs: IIPFSConfigApi, key, value)
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

export async function configApiCors(ipfs: IIPFSConfigApi)
{
	let ls: boolean[] = [];
	let bool: boolean;
	bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Origin', ["*"])
	ls.push(bool);

	bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Methods', ["GET", "POST"])
	ls.push(bool);

	bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Headers', ["Authorization"])
	ls.push(bool);

	bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Expose-Headers', ["Location"])
	ls.push(bool);

	bool = await _setIfNotExists(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Credentials', ["true"])
	ls.push(bool);

	return ls
}

export default configApiCors
