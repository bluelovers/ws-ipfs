import { IIPFSClientReturn } from '@bluelovers/ipfs-http-client';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';

/**
 * https://ipfs.infura.io/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
 */
export async function cat(ipfs: IIPFSFileApi)
{
	const ipfsPath = '/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
	const expected = 'Hello from IPFS Gateway Checker\n';

	const startTime = Date.now();

	let success = false;
	let error: Error;

	await Promise.resolve()
		.then(async () => {
			const chunks: Buffer[] = [];

			for await (const chunk of ipfs.cat(ipfsPath, {
				timeout: 5000,
			}))
			{
				chunks.push(chunk)
			}

			const content = Buffer.concat(chunks).toString();

			success = content === expected
		})
		.catch(e => {
			error = e
		})
	;

	return {
		success,
		spendTime: Date.now() - startTime,
		error,
	}
}

export default cat
