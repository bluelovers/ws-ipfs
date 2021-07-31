/**
 * Created by user on 2020/5/17.
 */
import { toCID } from '@lazy-ipfs/to-cid';
import { getIpfsServerList, IIPFSAddressesLike } from 'ipfs-server-list';
import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { cidToString, cidToBase32 } from '@lazy-ipfs/cid-to-string';
import { ICIDValueOrRaw, IRawCIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { IParsePathResult } from '@lazy-ipfs/parse-ipfs-path/lib/types';
import { isParsePathResult } from '@lazy-ipfs/parse-ipfs-path/lib/asserts';

const defaultGatewayDomain = getIpfsServerList().cloudflare.GatewayDomain;

export type IIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike> = Omit<T, 'GatewayDomain'> & {
	GatewayDomain: string,
};

export function assertIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): asserts gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>
{
	if (isIPFSAddressesLikeWithGatewayDomain(gatewayDomain))
	{
		return;
	}

	throw new TypeError(`Cannot read property 'GatewayDomain' of gatewayDomain: ${gatewayDomain}`)
}

export function isIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>
{
	return (typeof gatewayDomain?.GatewayDomain === 'string' && gatewayDomain.GatewayDomain.length)
}

export function assertGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): asserts gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>
{
	gatewayDomain = getGatewayDomain(gatewayDomain);

	if (typeof gatewayDomain !== 'string' || !gatewayDomain.length)
	{
		throw new TypeError(`gatewayDomain must is IIPFSAddressesLike or string`)
	}
}

export function getGatewayDomain(gatewayDomain: string | IIPFSAddressesLike): string
{
	if (typeof gatewayDomain !== 'string')
	{
		gatewayDomain = gatewayDomain.GatewayDomain
	}

	return gatewayDomain
}

export function toSubdomainCID(cid: ICIDValueOrRaw)
{
	return cidToBase32(toCID(cid));
}

export type ISubdomainInput = ICIDValueOrRaw | IParsePathResult;

/**
 * @deprecated use {@link ipfsSubdomainURL2}
 */
export function ipfsSubdomainURL(cid: ISubdomainInput,
	gatewayDomain?: string | IIPFSAddressesLike,
	protocol?: string | 'https:' | 'http:',
)
{
	if (typeof cid === 'string')
	{
		let result = parsePath(cid, {
			noThrow: true,
		})

		if (result?.hash)
		{
			cid = result
		}
	}

	let path: string = '';

	if (isParsePathResult(cid))
	{
		path = cid.path;
		cid = cid.hash;
	}

	cid = toSubdomainCID(cid as string);

	gatewayDomain = getGatewayDomain(gatewayDomain ?? defaultGatewayDomain);

	assertGatewayDomain(gatewayDomain);

	return new URL(`${protocol || 'https:'}//${cid}${gatewayDomain}${path ?? ''}`)
}

export interface IOptions
{
	gatewayDomain?: string | IIPFSAddressesLike,
	protocol?: string | 'https:' | 'http:',
	clearPathname?: boolean,
	filename?: string,
}

export function _handleOptions(cid: ISubdomainInput,
	gatewayDomain?: string | IIPFSAddressesLike,
	protocol?: IOptions["protocol"] | IOptions,
	options?: IOptions,
)
{
	if (protocol !== null && typeof protocol === 'object' && !options)
	{
		options = protocol;
		protocol = undefined;
	}

	options ??= {};
	gatewayDomain ??= options.gatewayDomain;
	protocol ??= options.protocol;

	return {
		cid,
		gatewayDomain,
		protocol,
		options,
	}
}

export function ipfsSubdomainURL2(cid: ISubdomainInput,
	gatewayDomain?: string | IIPFSAddressesLike,
	protocol?: IOptions["protocol"] | IOptions,
	options?: IOptions,
)
{
	({
		cid,
		gatewayDomain,
		protocol,
		options,
	} = _handleOptions(cid, gatewayDomain, protocol, options));

	let url = ipfsSubdomainURL(cid, gatewayDomain, protocol as string);

	if (options.clearPathname)
	{
		url.pathname = '';
	}

	if (options.filename?.length)
	{
		url.searchParams.set('filename', options.filename);
	}

	return url
}

export function ipfsSubdomain(cid: ISubdomainInput,
	gatewayDomain?: string | IIPFSAddressesLike,
	protocol?: IOptions["protocol"] | IOptions,
	options?: IOptions,
)
{
	return ipfsSubdomainURL2(cid, gatewayDomain, protocol, options).href
}

export default ipfsSubdomain
