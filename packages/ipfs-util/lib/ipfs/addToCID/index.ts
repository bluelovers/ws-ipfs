import { IIPFSPromiseApi } from 'ipfs-types';
import { ITSValueOrArray } from 'ts-type';
import { ICIDValue, ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { toCID } from '@lazy-ipfs/to-cid';
import { CID as MultiformatsCID } from 'multiformats';

/**
 * https://discuss.ipfs.io/t/how-can-attach-cid-to-new-node/7534/5
 */
export function addSourceToTargetCore(source: {
	cid: ICIDValue,
	name: string,
}, target: {
	cid: ICIDValue,
}, ipfs: IIPFSPromiseApi)
{
	return ipfs.object.patch.addLink(toCID(target.cid), {
		// @ts-ignore
		name: source.Name ?? source.name,
		// @ts-ignore
		cid: toCID(source.Hash ?? source.cid),
	})
}

export async function addSourceToTarget(source: ITSValueOrArray<{
	cid: ICIDValue,
	name: string,
}>, target: {
	cid: ICIDValue,
}, ipfs: IIPFSPromiseApi)
{
	if (Array.isArray(source))
	{
		let cid: MultiformatsCID = target.cid as MultiformatsCID;
		for await (const entry of source)
		{
			cid = await addSourceToTargetCore(entry, {
				cid,
			}, ipfs)
		}
		return cid;
	}
	else
	{
		return addSourceToTargetCore(source, target, ipfs)
	}
}

export default addSourceToTarget
