///<reference types="chrome"/>

import { IIPFSPromiseApi } from 'ipfs-types';
import { IWindow, IDetectIpfsCompanionSyncParams } from './types';

/**
 * @see https://github.com/ipfs-shipyard/ipfs-redux-bundle/blob/master/src/companion/index.js
 */
export function detectIpfsCompanionSync(opts?: IDetectIpfsCompanionSyncParams)
{
	const win: IWindow = opts?.window ?? ((typeof window !== 'undefined') && window);

	try
	{
		const ipfs: IIPFSPromiseApi = win?.chrome?.extension?.getBackgroundPage?.()?.ipfsCompanion?.ipfs;

		if (ipfs === null || ipfs === void 0)
		{
			return;
		}

		return {
			ipfs,
			provider: 'ipfs-companion' as const
		}
	}
	catch (err)
	{

	}
}

export async function detectIpfsCompanion(opts?: IDetectIpfsCompanionSyncParams)
{
	return detectIpfsCompanionSync(opts)
}

export default detectIpfsCompanion
