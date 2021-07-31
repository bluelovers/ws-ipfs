import fetch from 'cross-fetch';
//import { Buffer } from "buffer";
import catIPFS from './ipfs';
import Bluebird, { TimeoutError } from 'bluebird';
import isErrorCode from 'is-error-code';
import { newAbortController, handleTimeout, handleCID, IFetchOptions } from './util';
import { IOptionsInput } from 'to-ipfs-url';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { cidToString } from '@lazy-ipfs/cid-to-string';
import { toCID } from '@lazy-ipfs/to-cid';
import { AbortControllerTimer } from 'abort-controller-timer';
import { RequestInit } from 'node-fetch';

export async function fetchIPFS(cid: ICIDValue, useIPFS?, timeout?: number, options: IFetchOptions = {})
{
	cid = handleCID(cid, useIPFS, options)

	return fetchIPFSCore(cid, useIPFS, timeout, options)
}

export async function fetchIPFSCore(cidLink: ICIDValue, useIPFS?, timeout?: number, options: IFetchOptions = {})
{
	timeout = handleTimeout(timeout);

	if (useIPFS)
	{
		return catIPFS(cidLink, useIPFS, timeout, options)
	}

	options ??= {};

	let fetchOptions: RequestInit = {
		...options?.fetchOptions,
		redirect: 'follow',
	};

	fetchOptions.timeout ??= options.timeout;
	fetchOptions.signal ??= options.signal;

	let controller: AbortControllerTimer;

	if (timeout && !fetchOptions.signal)
	{
		controller = newAbortController(timeout).controller;

		fetchOptions.signal = controller.signal;
	}

	return Bluebird.resolve(fetch(cidLink.toString(), fetchOptions as any) as ReturnType<typeof fetch>)
		.timeout(timeout)
		.tapCatch(TimeoutError, () => controller.abort())
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
		.finally(() => controller?.abort())
		;
}

export default fetchIPFS

