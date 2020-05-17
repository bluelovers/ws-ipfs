/**
 * Created by user on 2020/5/17.
 */
import { ICIDObject, ICIDValue } from 'ipfs-types/lib/types';
import toCID, { IRawCID, isRawCIDLike } from '@lazy-ipfs/to-cid';
import { getIpfsServerList, IIPFSAddressesLike } from 'ipfs-server-list';

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

export function ipfsSubdomainURL(cid: ICIDValue | IRawCID, gatewayDomain: string | IIPFSAddressesLike = defaultGatewayDomain, protocol: string | 'https:' | 'http:' = 'https:')
{
	cid = toCID(cid).toV1().toBaseEncodedString('base32');

	gatewayDomain = getGatewayDomain(gatewayDomain);

	assertGatewayDomain(gatewayDomain);

	return new URL(`${protocol || 'https:'}//${cid}${gatewayDomain}`)
}

export function ipfsSubdomain(cid: ICIDValue | IRawCID, gatewayDomain?: string | IIPFSAddressesLike, protocol?: string | 'https:' | 'http:')
{
	return ipfsSubdomainURL(cid, gatewayDomain, protocol).href
}

export default ipfsSubdomain
