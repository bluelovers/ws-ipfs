//import { Buffer } from "buffer";
import Bluebird from 'bluebird';
import { IIPFSPromiseApi } from 'ipfs-types';
import { newAbortController } from './util';

export function refIPFS(cid: string, ipfs: IIPFSPromiseApi, timeout?: number)
{
	timeout = timeout |= 0 || 10 * 1000;

	const { controller, timer } = newAbortController(timeout);

	return Bluebird.resolve()
		.then(async () =>
		{
			for await (const ref of ipfs.refs(cid, {
				timeout,
				signal: controller.signal,
				//pin: false,
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
		.finally(() => controller.clear())
}

export function catIPFS(cid: string, ipfs: IIPFSPromiseApi, timeout?: number)
{
	timeout = timeout |= 0 || 60 * 1000;

	const { controller, timer } = newAbortController(timeout);

	return refIPFS(cid, ipfs, timeout)
		.catch(Error, async (e: Error & {
			response?: Response
		}) => {
			if (e.message && e.message.toLowerCase().includes('ipfs method not allowed'))
			{
				//console.warn(String(e).replace(/\s+$/, ''), `\nurl: ${e.response.url}`, `\nwill ignore this error and trying fetch content`);
				return;
			}

			return Promise.reject(e)
		})
		.then(async () => {
			const chunks: Buffer[] = [];
			for await (const chunk of ipfs.cat(cid, {
				timeout,
				signal: controller.signal,
				//pin: false,
			})) {
				chunks.push(chunk)
			}
			return Buffer.concat(chunks)
		})
		.finally(() => {
			controller.abort();
			controller.clear();
		})
	;
}

export default catIPFS
