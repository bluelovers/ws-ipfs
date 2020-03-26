import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { IIPFSFileApi, IFileData, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { ITSValueOrArray } from 'ts-type';
import { handleClientList } from '../handleClientList';
import { INetworkOptionsBase } from 'ipfs-types/lib/options';
import { handleTimeout } from '../../util';
import { PromiseSettledResult } from '../types';
import Bluebird from 'bluebird';
import { IPublishToIPFSReturn } from './types';

export function publishToIPFSRace(data: IFileData,
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

	return new Bluebird<IPublishToIPFSReturn>(async (resolve, reject) =>
	{
		const list = [] as IPublishToIPFSReturn;

		await handleClientList(useIPFS, (ipfs => typeof ipfs?.add === 'function'))
			.each(async (ipfs) =>
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
						resolve([
							{
								status: "fulfilled",
								value,
							},
						]);
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
			})
		;

		resolve(list);
	})
		;
}

export default publishToIPFSRace
