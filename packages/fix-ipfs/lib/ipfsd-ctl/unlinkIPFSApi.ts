import { join } from "path";
import { statSync, unlinkSync, Stats } from "fs";

export function unlinkIPFSApi(ipfsPath: string)
{
	const api = join(ipfsPath, 'api');
	let stat: Stats;
	try
	{
		stat = statSync(api);
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
