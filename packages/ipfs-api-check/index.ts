import * as _allChecks from './lib';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs';
import { IRunCheck } from './lib/util';
import { ITSUnpackedPromiseLike } from 'ts-type';

export type IAllTopKeys = keyof typeof _allChecks;

export type ICheckAll = {
	[key in IAllTopKeys]: ITSUnpackedPromiseLike<ReturnType<typeof _allChecks[key]>>
}

export async function checkAll(ipfs: IIPFSPromiseApi)
{
	let keys = Object.keys(_allChecks);

	keys.sort();

	let map: ICheckAll = {} as any;

	for (let key of keys)
	{
		map[key] = await _allChecks[key](ipfs)
	}

	return map
}

export default checkAll
