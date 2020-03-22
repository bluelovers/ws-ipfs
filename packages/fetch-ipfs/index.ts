import fetch from 'cross-fetch';
import toURL, { toPath, toLink, isCidOrPath, IOptionsInput } from 'to-ipfs-url';
import { cid as isIPFS } from 'is-ipfs';
import { Buffer } from "buffer";
import AbortController from 'abort-controller';
import catIPFS from './ipfs';
import Bluebird from 'bluebird';
import isErrorCode from 'is-error-code';

export function handleCID(cid: string, useIPFS?, options: IOptionsInput = {})
{
	if (useIPFS)
	{
		try
		{
			cid = new URL(cid).pathname
		}
		catch (e)
		{
			if (!isCidOrPath(cid))
			{
				cid = toPath(cid, options)
			}
		}
	}
	else
	{
		try
		{
			cid = new URL(cid).href
		}
		catch (e)
		{
			cid = toLink(cid, options)
		}
	}

	return cid
}

export function handleTimeout(timeout: number)
{
	return timeout |= 0 > 0 ? timeout : 60 * 1000;
}

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

	const controller = new AbortController();
	const timer = setTimeout(
		() => controller.abort(),
		timeout,
	);

	return Bluebird.resolve(fetch(cid, {
			redirect: 'follow',
			// @ts-ignore
			timeout,
			signal: controller.signal,
		}) as ReturnType<typeof fetch>)
		.finally(() => clearTimeout(timer))
		.tap(v => {
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

