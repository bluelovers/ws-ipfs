/**
 * Created by user on 2020/4/3.
 */
import fetch from 'cross-fetch';
import { IPokeReturn, IPokeReturnBase, IPokeOptions } from './types';
import { corsURL } from './util';
import { AbortControllerTimer } from 'abort-controller-timer';
import { Agent } from 'https';
import { RequestInit, RequestInfo, Response } from 'node-fetch';
import { getUnSafeAgent } from 'unsafe-https-agent';

export function pokeURL(ipfsURL: URL | string, options?: IPokeOptions)
{
	let url = corsURL(ipfsURL.toString(), options?.cors);

	let fetchOptions: RequestInit = {
		method: 'HEAD',
		...options.fetchOptions,
	};

	fetchOptions.agent ??= getUnSafeAgent();
	fetchOptions.signal ??= options.signal;

	let controller: AbortControllerTimer;

	if (!fetchOptions.signal)
	{
		controller = new AbortControllerTimer(options?.timeout || 10 * 1000);
		fetchOptions.signal = controller.signal;
	}

	return fetch(url.href, fetchOptions as any)
		.then(async (res) =>
		{
			const { headers, status, statusText } = res;

			let xIpfsPath = headers.get?.('x-ipfs-path') || headers.get?.['X-Ipfs-Path'] || headers['x-ipfs-path'] || headers['X-Ipfs-Path'];

			if (!xIpfsPath)
			{
				Object.entries(headers)
					.some(([key, value]) => {
						if (key.toLowerCase() === 'x-ipfs-path')
						{
							xIpfsPath = value;
							return true
						}
					})
			}

			if (xIpfsPath)
			{
				return {
					value: xIpfsPath as string,
					status,
					statusText,
					headers,
				} as IPokeReturn<{
					value: string,
				}>
			}
			else if (status < 200 || status >= 400)
			{
				return {
					value: false as false,
					status,
					statusText,
					headers,
				} as IPokeReturn<{
					value: false,
				}>
			}

			return {
				value: null as void,
				status,
				statusText,
				headers,
			} as IPokeReturn
		})
		.catch((error: Error) => {
			return {
				error,
			} as IPokeReturn<{
				error: Error;
			}>
		})
		.finally(() => controller?.clear())
}

export default pokeURL
