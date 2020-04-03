/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import fetch from 'cross-fetch';
import { IPokeReturn, IPokeReturnBase, IPokeOptions } from './types';
import { corsURL } from './util';

export function pokeURL(ipfsURL: URL | string, options?: IPokeOptions)
{
	let url = corsURL(ipfsURL.toString(), options?.cors);

	return fetch(url.href, {
		method: 'HEAD',
	})
		.then(async (res) =>
		{
			const { headers, status, statusText } = res;

			let xIpfsPath = headers.get?.('x-ipfs-path') || headers.get?.['X-Ipfs-Path'] || headers?.['x-ipfs-path'] || headers?.['x-ipfs-path'];

			if (xIpfsPath)
			{
				return {
					value: xIpfsPath as string,
					status,
					statusText,
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
				} as IPokeReturn<{
					value: false,
				}>
			}

			return {
				value: null as void,
				status,
				statusText,
			} as IPokeReturn
		})
		.catch((error: Error) => {
			return {
				error,
			} as IPokeReturn<{
				error: Error;
			}>
		})
}

export default pokeURL
