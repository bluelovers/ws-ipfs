import isIPFS from 'is-ipfs';
import { LazyURL } from 'lazy-url';
import { IParsePathResult } from './types';
import { EnumParsePathResultNs } from './asserts';
import { _url_href } from '@lazy-ipfs/is-cid/index';

export const subdomainGatewayPattern = /^https?:\/\/([^/]+)\.(ip[fn]s)\.[^/?]+/

export function _handleFromURL(input: string): IParsePathResult | string
{
	input = _url_href(input as any);

	if (isIPFS.cidPath(input))
	{
		return input
	}
	else if (!/^\w+(?:[+\-]\w+)?:\/\//.test(input))
	{
		return
	}

	let url = new LazyURL(input);
	let parts: RegExpMatchArray;

	if (isIPFS.subdomain(url.origin))
	{
		parts = url.origin.match(subdomainGatewayPattern);

		return {
			ns: parts[2] as any,
			hash: parts[1],
			path: url.pathname,
		}
	}
	else if (isIPFS.cid((parts = url.host.split('.'))[0]))
	{
		return {
			ns: parts[1]?.toLowerCase() === EnumParsePathResultNs.ipns
				? EnumParsePathResultNs.ipns
				: EnumParsePathResultNs.ipfs,
			hash: parts[0],
			path: url.pathname,
		}
	}
	else if (isIPFS.path(url.pathname))
	{
		return url.pathname
	}
}

