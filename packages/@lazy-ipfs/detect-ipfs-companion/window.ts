import { IDetectIpfsWindowParams } from './types';
import { IPFS } from 'ipfs-core-types';

export function detectIpfsWindowSync(opts?: IDetectIpfsWindowParams)
{
	try
	{
		const ipfs: IPFS = (opts?.window ?? ((typeof window !== 'undefined') && window))?.ipfs;

		if (ipfs === null || ipfs === void 0)
		{
			return;
		}

		return {
			ipfs,
			provider: 'window.ipfs' as const
		}
	}
	catch (err)
	{

	}
}

export async function detectIpfsWindow(opts?: IDetectIpfsWindowParams)
{
	return detectIpfsWindowSync(opts)
}

export default detectIpfsWindow
