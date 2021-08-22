import { IExtendOptions, IHasFilesAPI } from './types';
import { IPFSPath } from 'ipfs-core-types/src/utils';
import { _getExtraOptions } from './util/_getExtraOptions';
import { CpOptions, StatResult } from 'ipfs-core-types/src/files';
import { posix } from 'path';
import { _promiseIgnoreError } from './util/_promise';
import { ipfsFilesMakeDirectory } from './mkdir';
import { _returnStat02 } from './stat';
import { ipfsFilesRemove } from './rm';
import { _dummyNull } from './util/_dummy';
import { isSameCID, newAssertionSameCIDError } from '@lazy-ipfs/is-same-cid/index';
import { ITSValueOrArray } from 'ts-type/lib/type/base';
import Bluebird from 'bluebird';
import { AggregateErrorExtra } from 'lazy-aggregate-error';
import { _promiseCatchAggregateError } from './util/_promiseCatchAggregateError';
//import { AggregateError } from 'bluebird';

export type IFilesCpOptionsExtra = IExtendOptions<CpOptions, {
	overwrite?: boolean;
	validCheck?: boolean,
}>

/**
 * @see https://github.com/ipfs/js-ipfs/issues/3747
 */
export async function _ipfsFilesCopy(ipfs: IHasFilesAPI,
	from: ITSValueOrArray<IPFSPath>,
	to: string,
	options?: CpOptions,
)
{
	if (options?.parents)
	{
		const dir_path = posix.dirname(to);

		if (dir_path.length && dir_path !== '/')
		{
			await _promiseIgnoreError(ipfsFilesMakeDirectory(ipfs, dir_path, options));
		}
	}

	return ipfs.files.cp(from, to, options)
}

export async function ipfsFilesCopy(ipfs: IHasFilesAPI,
	from: ITSValueOrArray<IPFSPath>,
	to: string,
	options?: IFilesCpOptionsExtra,
)
{
	let extraOptions = _getExtraOptions(options);

	if (extraOptions.validCheck)
	{
		// @ts-ignore
		if (typeof from !== 'string' && typeof from.length === 'number')
		{
			throw new TypeError('Not support multiple cids when validCheck is enabled')
		}
	}

	if (extraOptions.overwrite)
	{
		await _promiseIgnoreError(ipfsFilesRemove(ipfs, to));
	}

	const err = new AggregateErrorExtra();

	let p: Promise<StatResult> = _ipfsFilesCopy(ipfs, from, to, options) as any;

	if (extraOptions.validCheck)
	{
		extraOptions = {
			...extraOptions,
			returnStat: true,
		}

		p = p.catch(e =>
		{
			err.push(e)
			return _dummyNull()
		})
	}

	p = _returnStat02(p, ipfs, to, extraOptions);

	if (extraOptions.validCheck)
	{
		p = p.then(file_stat =>
		{
			if (!file_stat || !isSameCID(file_stat.cid, from as string))
			{
				return Promise.reject(newAssertionSameCIDError(file_stat?.cid, from))
			}

			return file_stat
		})
	}

	p = _promiseCatchAggregateError(p, err);

	return p
}
