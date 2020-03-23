import fetch from 'cross-fetch';
import { Buffer } from "buffer";
import catIPFS from './ipfs';
import Bluebird from 'bluebird';
import isErrorCode from 'is-error-code';
import { newAbortController, handleTimeout, handleCID } from './util';

export async function fetchIPFS(cid: string, useIPFS?, timeout?: number)
{
	cid = handleCID(cid, useIPFS)

	return fetchIPFSCore(cid, useIPFS, timeout)
}

export async function fetchIPFSCore(cid: string, useIPFS?, timeout?: number)
{
	timeout = handleTimeout(timeout);

	if (useIPFS)
	{
		return catIPFS(cid, useIPFS, timeout)
	}

	const { controller, timer } = newAbortController(timeout);

	return Bluebird.resolve(fetch(cid, {
			redirect: 'follow',
			// @ts-ignore
			timeout,
			signal: controller.signal,
		}) as ReturnType<typeof fetch>)
		.finally(() => clearTimeout(timer))
		.tap(v =>
		{
			if (isErrorCode(v.status))
			{
				let e = new Error(v.statusText);
				// @ts-ignore
				e.res = v;
				return Promise.reject(e)
			}
		})
		.then(v => v.arrayBuffer())
		.then(buf => Buffer.from(buf))
		;
}

export default fetchIPFS

