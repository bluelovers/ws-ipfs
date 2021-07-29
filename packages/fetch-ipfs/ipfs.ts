//import { Buffer } from "buffer";
import Bluebird from 'bluebird';
import { IIPFSPromiseApi } from 'ipfs-types';
import { newAbortController } from './util';
import { IPFS } from 'ipfs-core-types';
import { ICIDValue } from '../@lazy-ipfs/detect-cid-lib/lib/types';
import { toCID } from '@lazy-ipfs/to-cid';
import { cidToString } from '@lazy-ipfs/cid-to-string';

export function refIPFS(cid: ICIDValue, ipfs: Pick<IPFS, 'refs'>, timeout?: number)
{
	timeout = timeout |= 0 || 10 * 1000;

	const { controller, timer } = newAbortController(timeout);

	return Bluebird.resolve()
		.then(async () =>
		{
			for await (const ref of ipfs.refs(cidToString(toCID(cid)), {
				timeout,
				signal: controller.signal,
				preload: true,
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

export function catIPFS(cid: ICIDValue, ipfs: Pick<IPFS, 'refs' | 'cat'>, timeout?: number)
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
			for await (const chunk of ipfs.cat(cidToString(toCID(cid)), {
				timeout,
				signal: controller.signal,
				preload: true,
				//pin: false,
			})) {
				// @ts-ignore
				chunks.push(chunk)
			}
			return Buffer.concat(chunks)
		})
		.finally(() => {
			controller.abort();
		})
	;
}

export default catIPFS
