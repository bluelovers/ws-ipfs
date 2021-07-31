import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { IIPFSFileApi, IFileData, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { ITSValueOrArray } from 'ts-type';
import { handleClientList } from '../handleClientList';
import { INetworkOptionsBase } from 'ipfs-types/lib/options';
import { handleTimeout, newAbortController } from '../../util';
import { PromiseSettledResult } from '../types';
import Bluebird from 'bluebird';
import { IPublishToIPFSReturn } from './types';
import _addAll from '@lazy-ipfs/compatible-add';
import { IPFS } from 'ipfs-core-types';
import { AbortControllerTimer } from 'abort-controller-timer';

export function publishToIPFSRace(data: IFileData,
	useIPFS: ITSValueOrArray<string | IIPFSPromiseApi | IIPFSClientAddresses | Pick<IPFS, 'add'>>,
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

	let controller: AbortControllerTimer;

	if (addOptions.timeout && !addOptions.signal)
	{
		controller = newAbortController(addOptions.timeout).controller;

		addOptions.signal = controller.signal;
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
					// @ts-ignore
					for await (const result of _addAll(ipfs, data, addOptions))
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
	}).finally(() => controller?.abort())
		;
}

export default publishToIPFSRace
