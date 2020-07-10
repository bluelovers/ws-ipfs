import { join } from "path";
import { statSync, unlinkSync } from "fs";

export function unlinkIPFSApi(ipfsPath: string)
{
	let api = join(ipfsPath, 'api');
	let stat = statSync(api);

	if (!stat.isFile())
	{
		throw new Error(`target path not a file, ${api}`);
	}

	unlinkSync(api);
}
