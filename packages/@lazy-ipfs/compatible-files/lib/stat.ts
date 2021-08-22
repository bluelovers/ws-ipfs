import { StatOptions } from 'ipfs-core-types/src/files';
import { IExtendOptions, IHasFilesAPI, IOptionsExtra } from './types';
import { _getExtraOptions } from './util/_getExtraOptions';
import { _ignoreError, _promiseIgnoreError } from './util/_promise';

export type IFilesStatOptionsExtra = IExtendOptions<StatOptions>;

export function ipfsFilesStat(ipfs: IHasFilesAPI, path: string, options?: IFilesStatOptionsExtra)
{
	let p = ipfs.files.stat(path, options);

	let extraOptions = _getExtraOptions(options);

	return _ignoreError(p, extraOptions)
}

export function _returnStat01(ipfs: IHasFilesAPI, path: string, extraOptions?: IOptionsExtra<{}>)
{
	let p = ipfsFilesStat(ipfs, path, extraOptions?.statOptions);

	return _ignoreError(p, extraOptions)
}

export function _returnStat02<P extends Promise<any>>(p: P, ipfs: IHasFilesAPI, path: string, extraOptions?: IOptionsExtra<{}>)
{
	if (extraOptions?.returnStat)
	{
		return p.then(() => _returnStat01(ipfs, path, extraOptions));
	}

	return p
}
