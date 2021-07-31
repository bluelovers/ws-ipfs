import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { filterList } from 'ipfs-server-list';
import { toURL, IOptions as IToURLOptions } from 'to-ipfs-url';
import { ipfsSubdomainURL2, IOptions as ISubdomainURLOptions } from '@lazy-ipfs/ipfs-subdomain/index';
import {
	parsePath,

} from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { IPFS } from 'ipfs-core-types';
import { array_unique_overwrite } from 'array-hyper-unique';
import { LazyURL } from 'lazy-url';
import { ipfsGatewayAddressesLink } from '@lazy-ipfs/ipfs-api-url';
import { IToCIDInputValue } from '@lazy-ipfs/to-cid';
import { resultToPath } from '@lazy-ipfs/parse-ipfs-path/lib/formatter';
import { IParsePathResult } from '@lazy-ipfs/parse-ipfs-path/lib/types';
import { EnumParsePathResultNs } from '@lazy-ipfs/parse-ipfs-path/lib/asserts';

export interface IOptions
{
	handleOptions?: Omit<IToURLOptions, 'prefix'> & Omit<ISubdomainURLOptions, 'gatewayDomain'>,
	serverList?: string[],
	ipfsGatewayList?: string[],
	ipfsGatewayDomainList?: string[],
}

export function makeIpfsGatewayAddressesURLAsync(cid: IToCIDInputValue, options: Omit<IOptions, 'serverList'> & {
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

export function makeIpfsGatewayURLList(cid: IToCIDInputValue, options?: IOptions)
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

export function makeIpfsGatewayDomainURLList(cid: IToCIDInputValue, options?: IOptions)
{
	const data: IParsePathResult = parsePath(cid as any, {
		noThrow: true,
		unsafeReturn: true,
	});

	return (options?.ipfsGatewayDomainList ?? options?.serverList ?? filterList('GatewayDomain')).map(gateway =>
	{
		try
		{
			return ipfsSubdomainURL2(data, gateway, options?.handleOptions);
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

export function lazyMakeIpfsAllServerURL(cid: IToCIDInputValue, options?: IOptions)
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

	list.push(...makeIpfsGatewayURLList(cid as any, {
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
