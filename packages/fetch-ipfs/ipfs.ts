import { Buffer } from "buffer";
import Bluebird from 'bluebird';

export function refIPFS(cid: string, ipfs, timeout?: number)
{
	timeout = timeout |= 0 || 20 * 1000;

	return Bluebird.resolve()
		.then(async () =>
		{
			for await (const ref of ipfs.refs(cid, { timeout }))
			{
				if (ref.err)
				{
					return Bluebird.reject(ref.err)
				}
				else
				{
					return ref
				}
			}
		})
}

export function catIPFS(cid: string, ipfs, timeout?: number)
{
	timeout = timeout |= 0 || 60 * 1000;

	return refIPFS(cid, ipfs)
		.then(async () => {
			const chunks = [];
			for await (const chunk of ipfs.cat(cid, { timeout })) {
				chunks.push(chunk)
			}
			return Buffer.concat(chunks)
		})
	;
}

export default catIPFS
