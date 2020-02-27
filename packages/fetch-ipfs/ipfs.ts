import { Buffer } from "buffer";
import Bluebird from 'bluebird';

export function refIPFS(cid: string, ipfs, timeout?: number)
{
	timeout = timeout |= 0 || 20 * 1000;

	return Bluebird.resolve()
		.then(async () =>
		{
			for await (const ref of ipfs.refs(cid, {
				timeout,
				pin: false,
			}))
			{
				if (ref.err)
				{
					return Promise.reject(ref.err)
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
		.catch(Error, async (e: Error & {
			response?: Response
		}) => {
			if (e.message && e.message.toLowerCase().includes('ipfs method not allowed'))
			{
				console.warn(String(e).replace(/\s+$/, ''), `\nurl: ${e.response.url}`, `\nwill ignore this error and trying fetch content`);
				return;
			}

			return Promise.reject(e)
		})
		.then(async () => {
			const chunks = [];
			for await (const chunk of ipfs.cat(cid, {
				timeout,
				pin: false,
			})) {
				chunks.push(chunk)
			}
			return Buffer.concat(chunks)
		})
	;
}

export default catIPFS
