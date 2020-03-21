import * as _allChecks from './lib';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';

export async function checkAll(ipfs: IIPFSPromiseApi)
{
	let keys = Object.keys(_allChecks);

	keys.sort();

	let map: Record<keyof typeof _allChecks, any> = {} as any;

	for (let key of keys)
	{
		map[key] = await _allChecks[key](ipfs)
	}

	return map
}

export default checkAll
