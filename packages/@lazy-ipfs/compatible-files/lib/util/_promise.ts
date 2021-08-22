import { _dummyNull } from './_dummy';
import { IHasFilesAPI, IOptionsExtra } from '../types';

export function _promiseIgnoreError<P extends Promise<any>>(p: P, _dummy?: (e?: any) => any): P
{
	return p.catch(_dummy ?? _dummyNull) as any
}

export function _ignoreError<P extends Promise<any>>(p: P, extraOptions?: IOptionsExtra<{}>, _dummy?: (e?: any) => any)
{
	if (extraOptions?.returnStat)
	{
		return _promiseIgnoreError(p, _dummy)
	}

	return p
}
