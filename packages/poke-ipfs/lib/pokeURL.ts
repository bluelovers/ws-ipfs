/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import fetch from 'cross-fetch';

export function pokeURL(ipfsURL: URL | string): Promise<boolean>
{
	let url = new URL(ipfsURL.toString());

	return fetch(url.href, {
		method: 'HEAD',
	})
		.then(async (res) =>
		{
			const headers = res.headers;

			let xIpfsPath = headers.get?.('x-ipfs-path') || headers.get?.['X-Ipfs-Path'] || headers?.['x-ipfs-path'] || headers?.['x-ipfs-path'];

			if (xIpfsPath)
			{
				return xIpfsPath
			}
			else if (res.status < 200 || res.status >= 400)
			{
				return false
			}

			return null
		})
		.catch(e => null)
}

export default pokeURL
