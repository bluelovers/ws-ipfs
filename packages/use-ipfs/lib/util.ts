/**
 * check ipfs is work
 */
import { IIPFSAddresses, IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSConfigApi } from 'ipfs-types/lib/ipfs/config';

export async function checkIPFS(ipfs)
{
	//await ipfs.id();
	await (ipfs as IIPFSPromiseApi).version();

	return true
}

export async function ipfsAddresses(ipfs): Promise<IIPFSAddresses>
{
	return (ipfs as IIPFSConfigApi).config.get('Addresses')
}
