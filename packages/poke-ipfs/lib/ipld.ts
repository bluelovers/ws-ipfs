/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import fetch from 'cross-fetch';
import { ndjson } from './ndjson';

export type IAsyncIteratorAble<T> = AsyncGenerator<T, void> | ReadableStream<T>;

export function pokeIPLD(cid: ICIDValue): Promise<boolean>
{
	let url = new URL('https://node0.preload.ipfs.io/api/v0/refs');

	url.searchParams.set('r', 'true');
	url.searchParams.set('arg', cid.toString());

	return fetch(url.href)
		.then(async (r) =>
		{
			for await (const chunk of ndjson<{
				Ref: string,
				Err: string,
			}>(r.body as any))
			{
				if (chunk?.Ref)
				{
					return true
				}
			}

			return false
		})
		.catch(e => null)
}

export default pokeIPLD
