/**
 * check ipfs is work
 */
import { IIPFSAddresses } from 'ipfs-types';

export async function checkIPFS(ipfs)
{
	await ipfs.id();

	return true
}

export async function ipfsAddresses(ipfs): Promise<IIPFSAddresses>
{
	return ipfs.config.get('Addresses')
}
