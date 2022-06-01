/**
 * Created by user on 2020/3/22.
 */
import pAny from 'p-any';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { fetchIPFSCore } from './index';
import { ITSValueOrArray } from 'ts-type';
import { filterList } from 'ipfs-server-list';
import { array_unique } from 'array-hyper-unique';
import { handleClientList } from './lib/handleClientList';
import { handleTimeout, handleCID, IFetchOptions, newAbortController } from './util';
import { IPFS } from 'ipfs-core-types';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { RequestInit } from 'node-fetch';
import { AbortControllerTimer } from 'abort-controller-timer';

export function raceFetchIPFS(cid: ICIDValue,
	useIPFS: ITSValueOrArray<(string | Pick<IPFS, 'refs' | 'cat'> | IIPFSClientAddresses)>,
	timeout?: number,
	options?: {
		filter?(buf: Buffer): boolean,
	} & IFetchOptions,
)
{
	const cid2 = handleCID(cid, true, options);
	timeout = handleTimeout(timeout);

	return handleClientList(useIPFS, (ipfs => typeof ipfs?.cat === 'function'))
		.then(ps =>
		{
			let fetchOptions: RequestInit = {
				...options?.fetchOptions,
				redirect: 'follow',
			};

			options = {
				...options,
				fetchOptions,
			};

			fetchOptions.timeout ??= options.timeout;
			// @ts-ignore
			fetchOptions.signal ??= options.signal;

			let controller: AbortControllerTimer;

			if (timeout && !fetchOptions.signal)
			{
				controller = newAbortController(timeout).controller;

				// @ts-ignore
				fetchOptions.signal = controller.signal;
			}

			const ls = ps.map(ipfs =>
			{
				return fetchIPFSCore(cid2, ipfs, timeout, options)
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
					ls.push(fetchIPFSCore(cid, null, timeout, options));
				})
			;

			return pAny(ls, {
				filter(buf)
				{
					return buf?.length > 0 && (options?.filter?.(buf) ?? true)
				},
			}).finally(() => controller?.abort())
		})
		;
}

export default raceFetchIPFS
