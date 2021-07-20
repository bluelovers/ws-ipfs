import { join } from "path";
import { statSync, unlinkSync, Stats } from "fs";
import { stat, unlink } from "fs/promises";

export function unlinkIPFSApi(ipfsPath: string)
{
	const api = join(ipfsPath, 'api');
	let stat: Stats;
	try
	{
		stat = statSync(api, {
			throwIfNoEntry: false
		});
	}
	catch (e)
	{

	}

	if (stat)
	{
		if (!stat.isFile())
		{
			throw new Error(`target path not a file, ${api}`);
		}

		unlinkSync(api);
	}
}

export async function unlinkIPFSApiAsync(ipfsPath: string)
{
	const api = join(ipfsPath, 'api');
	return stat(api, {
		throwIfNoEntry: false
	})
		.then(stat =>
		{
			if (stat)
			{
				if (!stat.isFile())
				{
					throw new Error(`target path not a file, ${api}`);
				}

				return unlink(api);
			}
		})
}
