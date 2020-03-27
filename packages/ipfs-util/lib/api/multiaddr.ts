import multiaddrToURL, { IMultiaddrToURLOptions } from 'multiaddr-to-url';
import { ipfsApiAddresses } from '../../api';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export async function ipfsApiAddressesLink(ipfs, opts?: IMultiaddrToURLOptions): Promise<string>
{
	return ipfsApiAddresses(ipfs)
		.then(api => {
			return multiaddrToURL(api, opts).href;
		})
}

export async function ipfsWebuiAddresses(ipfs, opts?: IMultiaddrToURLOptions): Promise<string>
{
	return ipfsApiAddresses(ipfs)
		.then(api => {
			const url = multiaddrToURL(api, opts) as URL;

			url.pathname = 'webui';

			return url.href;
		})
}
