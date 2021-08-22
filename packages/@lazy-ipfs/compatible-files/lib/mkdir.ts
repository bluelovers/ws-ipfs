import { MkdirOptions, StatResult } from 'ipfs-core-types/src/files';
import { IExtendOptions, IHasFilesAPI } from './types';
import { _getExtraOptions } from './util/_getExtraOptions';
import { _returnStat01, _returnStat02, IFilesStatOptionsExtra, ipfsFilesStat } from './stat';
import { _ignoreError, _promiseIgnoreError } from './util/_promise';
import { _promiseCatchAggregateError } from './util/_promiseCatchAggregateError';

export type IFilesMakeDirectoryOptionsExtra = IExtendOptions<MkdirOptions>

export function ipfsFilesMakeDirectory(ipfs: IHasFilesAPI, dir_path: string, options?: IFilesMakeDirectoryOptionsExtra)
{
	let p: Promise<StatResult> = ipfs.files.mkdir(dir_path, options) as any;

	let extraOptions = _getExtraOptions(options);

	p = _ignoreError(p, extraOptions);

	p = _returnStat02(p, ipfs, dir_path, extraOptions);

	return p;
}
