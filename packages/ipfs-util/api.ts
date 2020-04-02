import { IIPFSPromiseApi, IIPFSAddresses } from 'ipfs-types';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export async function checkIPFS(ipfs)
{
	//await ipfs.id();
	const ret = await (ipfs as IIPFSPromiseApi)
		.version()
	;

	return !!ret.version
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
