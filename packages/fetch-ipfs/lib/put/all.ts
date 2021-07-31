import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { IIPFSFileApi, IFileData, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { ITSValueOrArray } from 'ts-type';
import { handleClientList } from '../handleClientList';
import { INetworkOptionsBase } from 'ipfs-types/lib/options';
import { handleTimeout, newAbortController } from '../../util';
import { IPublishToIPFSReturn } from './types';
import Bluebird from 'bluebird';
import _addAll from '@lazy-ipfs/compatible-add';
import { AbortControllerTimer } from 'abort-controller-timer';

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

	return handleClientList(useIPFS as any, (ipfs => typeof ipfs?.add === 'function'))
		.reduce(async (list, ipfs) =>
		{
			const value: IIPFSFileApiAddReturnEntry[] = [];

			await (async () =>
			{
				for await (const result of _addAll(ipfs, data as any, addOptions))
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
		}, [] as IPublishToIPFSReturn).finally(() => controller?.abort())
		;

}

export default publishToIPFSAll
