import multiaddrToURL, { IMultiaddrToURLOptions } from 'multiaddr-to-url';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export async function ipfsApiAddresses(ipfs): Promise<string>
{
	return (ipfs as IIPFSConfigApi).config.get<string>('Addresses.API')
}

export async function ipfsGatewayAddresses(ipfs): Promise<string>
{
	return (ipfs as IIPFSConfigApi).config.get<string>('Addresses.Gateway')
}

export async function ipfsApiAddressesLink(ipfs, opts?: IMultiaddrToURLOptions): Promise<string>
{
	return ipfsApiAddresses(ipfs)
		.then(api =>
		{
			return multiaddrToURL(api, opts).href;
		})
}

export async function ipfsWebuiAddresses(ipfs, opts?: IMultiaddrToURLOptions): Promise<string>
{
	return ipfsApiAddresses(ipfs)
		.then(api =>
		{
			const url = multiaddrToURL(api, opts) as URL;

			url.pathname = 'webui';

			return url.href;
		})
}

export async function ipfsGatewayAddressesLink(ipfs, opts?: IMultiaddrToURLOptions): Promise<string>
{
	return ipfsGatewayAddresses(ipfs)
		.then(api =>
		{
			const url = multiaddrToURL(api, opts) as URL;

			url.pathname = 'ipfs/';

			return url.href;
		})
}
