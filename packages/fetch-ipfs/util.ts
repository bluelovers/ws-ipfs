import AbortController from 'abort-controller';
import { IOptionsInput, isCidOrPath, toPath, toLink } from 'to-ipfs-url';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { filterList } from 'ipfs-server-list';
import { AbortControllerTimer } from 'abort-controller-timer';

export type IFetchOptions = Exclude<IOptionsInput, string>

export function newAbortController(timeout: number)
{
	const controller = new AbortControllerTimer(timeout);
	return {
		controller,
		timer: controller.timer,
	}
}

export function handleCID(cid: string, useIPFS?, options: IOptionsInput = {})
{
	if (useIPFS)
	{
		try
		{
			cid = new URL(cid).pathname
		}
		catch (e)
		{
			if (!isCidOrPath(cid))
			{
				cid = toPath(cid, options)
			}
		}
	}
	else
	{
		try
		{
			cid = new URL(cid).href
		}
		catch (e)
		{
			cid = toLink(cid, options)
		}
	}

	return cid
}

export function handleTimeout(timeout: number | string): number
{
	if (timeout === 0)
	{
		return void 0
	}

	return (timeout as number) |= 0 > 0 ? timeout as number : 60 * 1000;
}

export function lazyRaceServerList(): IIPFSClientAddresses[]
{
	return filterList('API')
}
