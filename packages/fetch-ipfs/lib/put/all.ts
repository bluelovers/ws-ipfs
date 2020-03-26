import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { IIPFSFileApi, IFileData, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { ITSValueOrArray } from 'ts-type';
import { handleClientList } from '../handleClientList';
import { INetworkOptionsBase } from 'ipfs-types/lib/options';
import { handleTimeout } from '../../util';
import { IPublishToIPFSReturn } from './types';
import Bluebird from 'bluebird';

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
			const value: IIPFSFileApiAddReturnEntry[] = [];

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
		}, [] as IPublishToIPFSReturn)
	;

}

export default publishToIPFSAll
