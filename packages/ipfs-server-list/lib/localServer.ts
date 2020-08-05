/**
 * Created by user on 2020/8/5.
 */
import { IIPFSAddressesLike, filterList } from '../index';

export interface ILocalServerParams
{
	host?: string;
	port?: number | string;
	apiPort?: number | string;
	protocol?: 'http' | 'https' | string;
}

export function localServerInfo(options?: ILocalServerParams): IIPFSAddressesLike
{
	let host = options?.host || 'localhost';
	let port = options?.port ?? 8080;
	let protocol = options?.protocol ?? 'http';

	let domain = host;
	if (port)
	{
		domain += ':' + port
	}

	return {
		API: {
			port: options?.apiPort ?? 5001,
			host,
			protocol,
		},
		Gateway: `${protocol}://${domain}/ipfs/`,

		IPLD: `${protocol}://explore.ipld.io.ipns.${domain}/#/explore/`,
		IPNS: `${protocol}://${domain}/ipns/`,

		GatewayDomain: `.ipfs.${domain}`,
		IPNSDomain: `.ipns.${domain}`,
	}
}

export function getLocalServerValue<K extends keyof IIPFSAddressesLike>(key: K, options?: ILocalServerParams)
{
	return filterList(key, {
		localhost: localServerInfo(options),
	})[0]
}

