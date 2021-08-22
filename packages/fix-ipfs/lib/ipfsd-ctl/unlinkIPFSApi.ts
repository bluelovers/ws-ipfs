import { join } from "path";
import { statSync, unlinkSync, Stats, stat, unlink } from "fs";
import { promisify } from "util";
import { fsStat, fsStatSync } from 'fs-stat';

export function _assertIsFile(api: string, stat: Stats)
{
	if (stat && !stat.isFile())
	{
		throw new Error(`target path not a file, ${api}`);
	}
}

export function _pathIpfsRunningApi(ipfsPath: string)
{
	return join(ipfsPath, 'api');
}

export function unlinkIPFSApi(ipfsPath: string)
{
	const api = _pathIpfsRunningApi(ipfsPath);

	let stat: Stats = fsStatSync(api, {
		throwIfNoEntry: false
	});

	if (stat)
	{
		_assertIsFile(api, stat);

		unlinkSync(api);
	}
}

export async function unlinkIPFSApiAsync(ipfsPath: string)
{
	const api = _pathIpfsRunningApi(ipfsPath);

	return fsStat(api, {
		throwIfNoEntry: false
	})
		.then(stat =>
		{
			if (stat)
			{
				_assertIsFile(api, stat);

				return promisify(unlink)(api);
			}
		})
}
