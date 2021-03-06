import fetch from 'cross-fetch';
//import { Buffer } from "buffer";
import catIPFS from './ipfs';
import Bluebird, { TimeoutError } from 'bluebird';
import isErrorCode from 'is-error-code';
import { newAbortController, handleTimeout, handleCID, IFetchOptions } from './util';
import { IOptionsInput } from 'to-ipfs-url';

export async function fetchIPFS(cid: string, useIPFS?, timeout?: number, options: IFetchOptions = {})
{
	cid = handleCID(cid, useIPFS, options)

	return fetchIPFSCore(cid, useIPFS, timeout)
}

export async function fetchIPFSCore(cidLink: string, useIPFS?, timeout?: number, options: IFetchOptions = {})
{
	timeout = handleTimeout(timeout);

	if (useIPFS)
	{
		return catIPFS(cidLink, useIPFS, timeout)
	}

	const { controller, timer } = newAbortController(timeout);

	return Bluebird.resolve(fetch(cidLink, {
			redirect: 'follow',
			// @ts-ignore
			timeout,
			signal: controller.signal,
		}) as ReturnType<typeof fetch>)
		.timeout(timeout)
		.tapCatch(TimeoutError, () => controller.abort())
		.finally(() => controller.clear())
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

