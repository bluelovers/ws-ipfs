///<reference lib="es2020" />

import { IIPFSPromiseApi } from 'ipfs-types';
import ipfsClient, { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import Bluebird from 'bluebird';
import { array_unique } from 'array-hyper-unique';
import { IIPFSFileApi, IFileData, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { ITSValueOrArray } from 'ts-type';
import { handleClientList } from '../handleClientList';
import { INetworkOptionsBase } from 'ipfs-types/lib/options';
import { ICIDObject, IMtime } from 'ipfs-types/lib/types';
import { handleTimeout } from '../../util';

export interface PromiseFulfilledResult<T> {
	status: "fulfilled";
	value: T;
}

export interface PromiseRejectedResult {
	status: "rejected";
	reason: any;
}

export type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

export function publishToIPFSAll(data: IFileData,
	useIPFS: ITSValueOrArray<string | IIPFSPromiseApi | IIPFSClientAddresses | Pick<IIPFSFileApi, 'add'>>,
	options?: {
		addOptions?: IIPFSFileApiAddOptions,
	} & INetworkOptionsBase,
)
{
	let { timeout, signal, addOptions } = options || {};

	timeout = handleTimeout(timeout as any);

	addOptions = {
		timeout,
		signal,
		...addOptions,
	}

	return handleClientList(useIPFS, (ipfs => typeof ipfs?.add === 'function'))
		.reduce(async (list, ipfs) =>
		{
			let value: IIPFSFileApiAddReturnEntry[] = [];

			await (async () =>
			{
				for await (const result of ipfs.add(data, addOptions))
				{
					value.push(result)
				}
			})()
				.then(e =>
				{

					list.push({
						status: "fulfilled",
						value,
					});

				})
				.catch(error =>
				{
					list.push({
						status: "rejected",
						reason: {
							error,
							value,
						},
					})
				})
			;

			return list
		}, [] as PromiseSettledResult<IIPFSFileApiAddReturnEntry[]>[])
	;

}


