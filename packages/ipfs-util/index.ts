import type { IIPFSPromiseApi, IIPFSAddresses } from 'ipfs-types';
import type { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export function isBufferMaybe(buf): buf is Buffer
{
	return buf?.length && typeof buf?.[0] === 'number'
}

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
