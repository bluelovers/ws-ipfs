/**
 * Created by user on 2020/3/22.
 */
import { IIPFSPromiseApi } from 'ipfs-types';
import pAny from 'p-any';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { fetchIPFSCore } from './index';
import { ITSValueOrArray } from 'ts-type';
import { filterList } from 'ipfs-server-list';
import { array_unique } from 'array-hyper-unique';
import { handleClientList } from './lib/handleClientList';
import { handleTimeout, handleCID } from './util';

export function raceFetchIPFS(cid: string,
	useIPFS: ITSValueOrArray<(string | IIPFSPromiseApi | IIPFSClientAddresses)>,
	timeout?: number,
	options?: {
	filter?(buf: Buffer): boolean,
	}
)
{
	const cid2 = handleCID(cid, true);
	timeout = handleTimeout(timeout || 10 * 1000);

	return handleClientList(useIPFS, (ipfs => typeof ipfs?.cat === 'function'))
		.then(ps =>
		{

			const ls = ps.map(ipfs =>
			{
				return fetchIPFSCore(cid2, ipfs, timeout)
			});

			array_unique([
				handleCID(cid, null),
				...filterList('Gateway').map(gateway => handleCID(cid, null, {
					prefix: {
						ipfs: gateway,
					},
				})),
			])
				.forEach(cid =>
				{
					ls.push(fetchIPFSCore(cid, null, timeout));
				})
			;

			return pAny(ls, {
				filter(buf)
				{
					return buf?.length > 0 && (options?.filter?.(buf) ?? true)
				},
			})
		})
		;
}

export default raceFetchIPFS
