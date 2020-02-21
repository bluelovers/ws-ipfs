import fetch from 'cross-fetch';
import toURL, { toPath, toLink, isCidOrPath } from 'to-ipfs-url';
import { cid as isIPFS } from 'is-ipfs';
import { Buffer } from "buffer";
import AbortController from 'abort-controller';
import catIPFS from './ipfs';
import Bluebird from 'bluebird';
import isErrorCode from 'is-error-code';


export async function fetchIPFS(cid: string, useIPFS?, timeout?: number)
{
	if (useIPFS != null)
	{
		try
		{
			cid = new URL(cid).pathname
		}
		catch (e)
		{
			if (!isCidOrPath(cid))
			{
				cid = toPath(cid)
			}
		}

		return fetchIPFSCore(cid, useIPFS, timeout)
	}

	try
	{
		cid = new URL(cid).href
	}
	catch (e)
	{
		cid = toLink(cid)
	}

	return fetchIPFSCore(cid, useIPFS, timeout)
}

export async function fetchIPFSCore(cid: string, useIPFS?, timeout?: number)
{
	timeout = timeout |= 0 || 60 * 1000;

	if (useIPFS != null)
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

