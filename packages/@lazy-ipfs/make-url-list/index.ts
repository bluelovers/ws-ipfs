import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { filterList } from 'ipfs-server-list';
import { toURL, IOptions as IToURLOptions } from 'to-ipfs-url';
import ipfsSubdomain from '@lazy-ipfs/ipfs-subdomain/index';
import {
	EnumParsePathResultNs,
	IParsePathResult,
	parsePath,
	resultToPath,
} from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { ipfsGatewayAddressesLink } from 'ipfs-util-lib/lib/api/multiaddr';
import { IPFS } from 'ipfs-core-types';
import { array_unique_overwrite } from 'array-hyper-unique';
import { LazyURL } from 'lazy-url';

export interface IOptions
{
	handleOptions?: Omit<IToURLOptions, 'prefix'>,
	serverList?: string[],
	ipfsGatewayList?: string[],
	ipfsGatewayDomainList?: string[],
}

export function makeIpfsGatewayAddressesURLAsync(cid: ICIDValue, options: Omit<IOptions, 'serverList'> & {
	ipfs: IPFS,
})
{
	return ipfsGatewayAddressesLink(options.ipfs)
		.then(gateway => toURL(cid, {
			...options?.handleOptions,
			prefix: {
				ipfs: gateway,
			},
		}))
}

export function makeIpfsGatewayURLList(cid: ICIDValue, options?: IOptions)
{
	return (options?.ipfsGatewayList ?? options?.serverList ?? filterList('Gateway')).map(gateway =>
	{
		return toURL(cid, {
			...options?.handleOptions,
			prefix: {
				ipfs: gateway,
			},
		});
	})
}

export function makeIpfsGatewayDomainURLList(cid: ICIDValue, options?: IOptions)
{
	const data: IParsePathResult = parsePath(cid, {
		noThrow: true,
		unsafeReturn: true,
	});

	return (options?.ipfsGatewayDomainList ?? options?.serverList ?? filterList('GatewayDomain')).map(gateway =>
	{
		try
		{
			return new URL(ipfsSubdomain(resultToPath(data), gateway));
		}
		catch (e)
		{

		}
	}).filter(Boolean)
}

export function makeShareIpfsURL(cid: ICIDValue, server?: string)
{
	const data: IParsePathResult = parsePath(cid, {
		noThrow: true,
		unsafeReturn: true,
	});

	return new LazyURL(`${server ?? 'https://share.ipfs.io'}/#/${data.hash}`)
}

export function lazyMakeIpfsAllServerURL(cid: ICIDValue, options?: IOptions)
{
	options ??= {};

	let list: URL[] = []

	if (options.serverList?.length)
	{
		list.push(...options.serverList.map(gateway =>
		{
			return toURL(cid, {
				...options.handleOptions,
				prefix: {
					ipfs: gateway,
				},
			});
		}) ?? []);
	}

	list.push(...makeIpfsGatewayURLList(cid, {
		...options,
		serverList: options.ipfsGatewayList,
	}));

	list.push(...makeIpfsGatewayDomainURLList(cid, {
		...options,
		serverList: options.ipfsGatewayDomainList,
	}));

	return array_unique_overwrite(list.filter(Boolean))
}

export function _notAllowedAddress(url: URL | string)
{
	if (typeof url === 'string')
	{
		url = new LazyURL(url.toString());
	}

	return url.protocol === 'ipfs:' || [
		'localhost',
		'127.0.0.1',
		'::',
		'::1',
	].includes(url.hostname)
}

export default lazyMakeIpfsAllServerURL
