import { IPFS } from 'ipfs-core-types';
import { IFilesStatOptionsExtra } from './stat';

export type IOptionsExtra<O extends {}> = O & {
	ignoreError?: boolean,
	returnStat?: boolean,
	statOptions?: IFilesStatOptionsExtra,
}

export type IExtendOptions<T extends {}, O extends {} = {}, TO extends {} = {}> = T & {
	extraOptions?: IOptionsExtra<O>
}

export type IHasFilesAPI = Pick<IPFS, 'files'>
