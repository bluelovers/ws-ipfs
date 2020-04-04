/**
 * Created by user on 2020/4/5.
 */
import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs';

export async function ipfsApiType(ipfs: IIPFSApiUtils): Promise<string | "js" | "go">
{
	const i = await ipfs.id().catch(e => null);
	let apiType: string | 'js' | 'go';

	if (i?.agentVersion?.match(/(js|go)-ipfs/i))
	{
		apiType = RegExp.$1.toLowerCase();
	}

	if (apiType === void 0)
	{
		const v = await ipfs.version().catch(e => null);

		if (v?.golang)
		{
			apiType = 'go';
		}
	}

	return apiType
}

export default ipfsApiType
