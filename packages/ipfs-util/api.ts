import { IIPFSPromiseApi, IIPFSAddresses } from 'ipfs-types';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';

export function checkIPFS(ipfs)
{
	return Bluebird.resolve(ipfs)
		.then(async (ipfs) => {
			let bool: boolean;
			const timeout = 2000;

			//await ipfs.id();
			bool = await (ipfs as IIPFSPromiseApi)
				.version({
					timeout,
				})
				.then(v => !!v)
			;

			if (!bool)
			{
				bool = await (ipfs as IIPFSPromiseApi)
					.id({
						timeout,
					})
					.then(v => !!v)
				;
			}

			return bool
		})
	;
}

export function assertCheckIPFS(ipfs)
{
	return checkIPFS(ipfs)
		.then(bool => {

			if (!bool)
			{
				return Promise.reject(new TypeError('invalid ipfs'))
			}

			return bool
		})
}

export async function ipfsAddresses(ipfs): Promise<IIPFSAddresses>
{
	return (ipfs as IIPFSConfigApi).config.get('Addresses')
}

export async function ipfsApiAddresses(ipfs): Promise<string>
{
	return (ipfs as IIPFSConfigApi).config.get('Addresses.API')
}

export async function ipfsGatewayAddresses(ipfs): Promise<string>
{
	return (ipfs as IIPFSConfigApi).config.get('Addresses.Gateway')
}
