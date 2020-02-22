import { unlinkSync, statSync } from 'fs';
import { join } from 'path';

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
