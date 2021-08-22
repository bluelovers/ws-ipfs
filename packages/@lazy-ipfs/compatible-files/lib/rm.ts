import { IExtendOptions, IHasFilesAPI } from './types';
import { CpOptions, RmOptions } from 'ipfs-core-types/src/files';
import { _ignoreError } from './util/_promise';
import { _getExtraOptions } from './util/_getExtraOptions';

export type IFilesRmOptionsExtra = IExtendOptions<RmOptions, {
	overwrite?: boolean;
}>

export async function ipfsFilesRemove(ipfs: IHasFilesAPI,
	path: string | string[],
	options?: IFilesRmOptionsExtra,
)
{
	let p = ipfs.files.rm(path, options);

	let extraOptions = _getExtraOptions(options);

	return _ignoreError(p, extraOptions)
}
