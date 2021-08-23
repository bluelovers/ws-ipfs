/**
 * Created by user on 2020/4/5.
 */
import { IPFS } from 'ipfs-core-types';

export async function ipfsApiType(ipfs: Pick<IPFS, 'id' | 'version'>, timeout?: number): Promise<string | "js" | "go">
{
	if (typeof timeout !== 'number')
	{
		timeout = void 0;
	}
	timeout ||= 5000;

	const i = await ipfs.id({
		timeout,
	}).catch(e => null as null);
	let apiType: string | 'js' | 'go';

	if (i?.agentVersion?.match(/(js|go)-ipfs/i))
	{
		apiType = RegExp.$1.toLowerCase();
	}

	if (apiType === void 0)
	{
		const v = await ipfs.version({
		timeout,
	}).catch(e => null as null);

		if (v?.golang)
		{
			apiType = 'go';
		}
	}

	return apiType
}

export default ipfsApiType
