import { IDetectIpfsWindowParams } from './types';
import { IIPFSPromiseApi } from 'ipfs-types';

export function detectIpfsWindowSync(opts?: IDetectIpfsWindowParams)
{
	try
	{
		const ipfs: IIPFSPromiseApi = (opts?.window ?? ((typeof window !== 'undefined') && window))?.ipfs;

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
