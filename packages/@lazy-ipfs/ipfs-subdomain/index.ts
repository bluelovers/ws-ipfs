/**
 * Created by user on 2020/5/17.
 */
import { toCID } from '@lazy-ipfs/to-cid';
import { getIpfsServerList, IIPFSAddressesLike } from 'ipfs-server-list';
import { IParsePathResult, isParsePathResult, parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { cidToString, cidToBase32 } from '@lazy-ipfs/cid-to-string';
import { ICIDValueOrRaw, IRawCIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';

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

export function ipfsSubdomainURL(cid: ICIDValueOrRaw | IParsePathResult,
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
}

export function ipfsSubdomain(cid: ICIDValueOrRaw,
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

	let url = ipfsSubdomainURL(cid, gatewayDomain, protocol as string);

	if (options?.clearPathname)
	{
		url.pathname = '';
	}

	return url.href
}

export default ipfsSubdomain
