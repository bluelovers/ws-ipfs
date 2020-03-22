/**
 * Created by user on 2020/3/22.
 */
import { IIPFSPromiseApi } from 'ipfs-types';
import pAny from 'p-any';
import ipfsClient, { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { handleCID, fetchIPFSCore, handleTimeout } from './index';
import { ITSValueOrArray } from 'ts-type';
import Bluebird from 'bluebird';
import { checkIPFS } from 'ipfs-util-lib';
import ipfsServerList from 'ipfs-server-list';
import { array_unique } from 'array-hyper-unique';

export function lazyRaceServerList(): IIPFSClientAddresses[]
{
	return [
		ipfsServerList['infura.io'].API,
	]
}

export function raceFetchIPFS(cid: string,
	useIPFS: ITSValueOrArray<(string | IIPFSPromiseApi | IIPFSClientAddresses)>,
	timeout?: number,
)
{
	const cid2 = handleCID(cid, true);
	timeout = handleTimeout(timeout);

	if (!Array.isArray(useIPFS))
	{
		useIPFS = [useIPFS];
	}

	return Bluebird
		.map<any, IIPFSPromiseApi>(useIPFS, (ipfs) =>
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
			// @ts-ignore
			else if (typeof ipfs === 'object' && typeof ipfs.cat === 'undefined')
			{
				if (!Object.keys(ipfs).length)
				{
					return
				}

				return ipfsClient(ipfs as IIPFSClientAddresses)
					.catch(e => null)
			}
			else if (typeof ipfs.cat === 'function')
			{
				return ipfs
			}
		})
		.filter(ipfs =>
		{
			return checkIPFS(ipfs).catch(e => false)
		})
		.then(ps =>
		{

			const ls = ps.map(ipfs =>
			{
				return fetchIPFSCore(cid2, ipfs, timeout)
			});

			array_unique([
				handleCID(cid, null),
				handleCID(cid, null, {
					prefix: {
						ipfs: ipfsServerList['infura.io'].Gateway,
					},
				}),
				handleCID(cid, null, {
					prefix: {
						ipfs: ipfsServerList.cloudflare.Gateway,
					},
				}),
			])
				.forEach(cid =>
				{
					ls.push(fetchIPFSCore(cid, null, timeout));
				})
			;

			return pAny(ls, {
				filter(buf)
				{
					return buf?.length > 0
				},
			})
		})
		;
}

export default raceFetchIPFS
