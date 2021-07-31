import { IIPFSAddresses } from 'ipfs-types';
import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';
import { IPFSHttpClient } from 'ipfs-types/index';
export { ipfsApiAddresses, ipfsGatewayAddresses } from '@lazy-ipfs/ipfs-api-url'

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

