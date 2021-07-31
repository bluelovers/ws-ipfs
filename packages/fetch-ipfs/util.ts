import AbortController from 'abort-controller';
import { IOptions, isCidOrPath, toPath, toLink } from 'to-ipfs-url';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { filterList } from 'ipfs-server-list';
import { AbortControllerTimer } from 'abort-controller-timer';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { RequestInit } from 'node-fetch';

export interface IFetchOptions extends IOptions
{
	timeout?: number,
	signal?: AbortSignal,
	fetchOptions?: RequestInit,
}

export function newAbortController(timeout: number)
{
	const controller = new AbortControllerTimer(timeout);
	return {
		controller,
		timer: controller.timer,
	}
}

export function handleCID(cid: ICIDValue, useIPFS?, options: IFetchOptions = {})
{
	if (useIPFS)
	{
		if (!isCidOrPath(cid))
		{
			cid = toPath(cid, options)
		}
	}
	else
	{
		cid = toLink(cid, options)
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
