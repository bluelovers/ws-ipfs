import { TextDecoder } from "util";
import { IAsyncIteratorAble } from './types';

/**
 * Parses NDJSON chunks from an iterator
 */
export async function* ndjson<T = any>(source: IAsyncIteratorAble<Uint8Array>): AsyncGenerator<T, void>
{
	const decoder = new TextDecoder()
	let buf = ''

	for await (const chunk of source as AsyncGenerator<Uint8Array>)
	{
		buf += decoder.decode(chunk, { stream: true })
		const lines = buf.split(/\r?\n/)

		for (let i = 0; i < lines.length - 1; i++)
		{
			const l = lines[i].trim()
			if (l.length > 0)
			{
				yield JSON.parse(l) as T
			}
		}

		buf = lines[lines.length - 1]
	}
	buf += decoder.decode()
	buf = buf.trim()

	if (buf.length !== 0)
	{
		yield JSON.parse(buf) as T
	}
}

export default ndjson
