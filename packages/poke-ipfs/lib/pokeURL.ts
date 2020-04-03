/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import fetch from 'cross-fetch';

export function pokeURL(ipfsURL: URL | string)
{
	let url = new URL(ipfsURL.toString());

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
				}
			}
			else if (status < 200 || status >= 400)
			{
				return {
					value: false as false,
					status,
					statusText,
				}
			}

			return {
				//value: null as void,
				status,
				statusText,
			}
		})
		.catch((error: Error) => {
			return {
				error,
			}
		})
}

export default pokeURL
