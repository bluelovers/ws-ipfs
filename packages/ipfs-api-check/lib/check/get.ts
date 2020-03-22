import { IIPFSClientReturn } from '@bluelovers/ipfs-http-client';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import BufferList from 'bl';
import { runSubCheck } from '../util';

export async function get(ipfs: IIPFSFileApi)
{
	const cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
	const expected = 'Hello from IPFS Gateway Checker\n';

	return runSubCheck(async () =>
		{
			let success;

			for await (const file of ipfs.get(cid, {
				timeout: 5000,
			}))
			{
				if (file.path === cid && !file.content)
				{
					continue;
				}

				const content = new BufferList();
				for await (const chunk of file.content)
				{
					content.append(chunk)
				}

				success = content.toString() === expected
			}

			return success
		})
	;
}

export default get
