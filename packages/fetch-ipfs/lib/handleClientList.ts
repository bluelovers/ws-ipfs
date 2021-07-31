import { ITSValueOrArray, ITSResolvable } from 'ts-type';
import ipfsClient, { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';

export type IUseIPFSInput = string | Partial<IPFS> | IIPFSClientAddresses;

export function handleClientList(useIPFS: ITSValueOrArray<IUseIPFSInput>,
	filter?: (ipfs: Partial<IPFS>) => ITSResolvable<boolean>,
)
{
	return Bluebird
		.resolve(useIPFS)
		.then(useIPFS =>
		{
			if (!Array.isArray(useIPFS))
			{
				return [useIPFS];
			}

			return useIPFS
		})
		// @ts-ignore
		.map<IIPFSPromiseApi>(async (ipfs: IUseIPFSInput) =>
		{
			if (!ipfs)
			{
				return
			}
			else if (typeof ipfs === 'string')
			{
				return ipfsClient(ipfs)
					.catch(e => null)
			}
			else if (filter && await filter(ipfs as any))
			{
				return ipfs as IPFS
			}
			// @ts-ignore
			else if (typeof ipfs === 'object' && (ipfs.port || ipfs.host))
			{
				return ipfsClient(ipfs as IIPFSClientAddresses)
					.catch(e => null)
			}
			else if (ipfs)
			{
				return ipfs as IPFS
			}

			return
		})
		.filter<IPFS>((ipfs) =>
		{
			if (ipfs)
			{
				if (filter)
				{
					return filter(ipfs)
				}

				return true
			}
		})
		;
}
