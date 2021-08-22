import { IIPFSAddresses } from 'ipfs-types';
import { IPFSHttpClient } from 'ipfs-types/index';

export { ipfsApiAddresses, ipfsGatewayAddresses } from '@lazy-ipfs/ipfs-api-url';

export { checkIPFS, assertCheckIPFS } from '@lazy-ipfs/check-ipfs-connect/index';

export async function ipfsAddresses(ipfs): Promise<IIPFSAddresses>
{
	return (ipfs as IPFSHttpClient).config.get<IIPFSAddresses>('Addresses')
}

