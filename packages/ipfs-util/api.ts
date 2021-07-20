import { IIPFSPromiseApi, IIPFSAddresses } from 'ipfs-types';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';
import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';
import { API as ConfigAPI } from 'ipfs-core-types/src/config';
import { IPFSHttpClient } from 'ipfs-types/index';

export function checkIPFS(ipfs)
{
	return assertCheckIPFS(ipfs)
		.catch(() => null as null)
}

export function assertCheckIPFS(ipfs)
{
	return Bluebird.resolve(ipfs as IPFS)
		.then(async (ipfs) => {
			let bool: boolean;
			const timeout = 2000;

			let _error: Error;

			bool = await ipfs
				.version({
					timeout,
				})
				.then(v => !!v)
				.catch(e => {
					_error = e;
					return null as null
				})
			;

			if (!bool)
			{
				bool = await ipfs
					.id({
						timeout,
					})
					.then(v => !!v)
					.catch(e => {
						_error = e;
						return null as null
					})
				;
			}

			if (!bool)
			{
				throw (_error || new Error('Invalid ipfs'))
			}

			return bool
		})
		;
}

export async function ipfsAddresses(ipfs): Promise<IIPFSAddresses>
{
	return (ipfs as IPFSHttpClient).config.get<IIPFSAddresses>('Addresses')
}

export async function ipfsApiAddresses(ipfs): Promise<string>
{
	return (ipfs as IIPFSConfigApi).config.get<string>('Addresses.API')
}

export async function ipfsGatewayAddresses(ipfs): Promise<string>
{
	return (ipfs as IIPFSConfigApi).config.get<string>('Addresses.Gateway')
}
