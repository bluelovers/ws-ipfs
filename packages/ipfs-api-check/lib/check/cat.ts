import { IIPFSClientReturn } from '@bluelovers/ipfs-http-client';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { runSubCheck } from '../util';

/**
 * https://ipfs.infura.io/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
 */
export async function cat(ipfs: IIPFSFileApi)
{
	const ipfsPath = '/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
	const expected = 'Hello from IPFS Gateway Checker\n';

	return runSubCheck(async () => {
			const chunks: Uint8Array[] = [];

			for await (const chunk of ipfs.cat(ipfsPath, {
				timeout: 5000,
			}))
			{
				chunks.push(chunk)
			}

			const content = Buffer.concat(chunks).toString();

			return content === expected
		})
	;
}

export default cat
