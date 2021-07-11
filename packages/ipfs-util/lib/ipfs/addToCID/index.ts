import { ICIDValue, ICIDObject } from 'ipfs-types/lib/types';
import { IIPFSPromiseApi } from 'ipfs-types';
import { ITSValueOrArray } from 'ts-type';
import CID from 'cids';

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
	return ipfs.object.patch.addLink(target.cid as CID, {
		name: source.name,
		cid: source.cid,
	})
}

export async function addSourceToTarget(source: ITSValueOrArray<{
	cid: ICIDValue,
	name: string,
}>, target: {
	cid: ICIDValue,
}, ipfs: IIPFSPromiseApi): Promise<ICIDObject>
{
	if (Array.isArray(source))
	{
		let cid: ICIDValue = target.cid;
		for await (const entry of source)
		{
			cid = await addSourceToTargetCore(entry, {
				cid,
			}, ipfs)
		}
		return cid as ICIDObject;
	}
	else
	{
		return addSourceToTargetCore(source, target, ipfs)
	}
}

export default addSourceToTarget
