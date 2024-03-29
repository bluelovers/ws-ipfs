/**
 * Created by user on 2020/4/3.
 */
import fetch from 'cross-fetch';
import { ndjson } from './ndjson';
import { IPokeReturn, IPokeReturnBase, IPokeOptions } from './types';
import { corsURL } from './util';
import { AbortControllerTimer } from 'abort-controller-timer';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { _pokeError } from './util/_parsePokeResponse';

export function pokeIPLD(cid: ICIDValue, options?: IPokeOptions)
{
	let url = corsURL('https://node0.preload.ipfs.io/api/v0/refs', options?.cors);

	url.searchParams.set('r', 'true');
	url.searchParams.set('arg', cid.toString());

	let fetchOptions: RequestInit = {};

	let controller = new AbortControllerTimer(options?.timeout || 1000)
	// @ts-ignore
	fetchOptions.signal = controller.signal;

	return fetch(url.href, fetchOptions)
		.then(async (res) =>
		{
			const { headers, status, statusText } = res;

			for await (const chunk of ndjson<{
				Ref: string,
				Err: string,
			}>(res.body as any))
			{
				if (chunk?.Ref)
				{
					return {
						value: true as true,
						status,
						statusText,
						headers,
					} as IPokeReturn<{
						value: true,
					}>
				}
			}

			if (status < 200 || status >= 400)
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
				//value: null as void,
				status,
				statusText,
				headers,
			} as IPokeReturn
		})
		.catch(e => _pokeError(e, url.href))
		.finally(() => controller.clear())
}

export default pokeIPLD
