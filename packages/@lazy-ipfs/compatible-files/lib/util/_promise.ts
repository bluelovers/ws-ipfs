import { _dummyNull } from './_dummy';
import { IHasFilesAPI, IOptionsExtra } from '../types';
import { AggregateErrorExtra } from 'lazy-aggregate-error';
import { _promiseCatchAggregateError } from './_promiseCatchAggregateError';

export function _promiseIgnoreError<P extends Promise<any>>(p: P, _dummy?: (e?: any) => any, err?: AggregateErrorExtra): P
{
	if (err)
	{
		p = _promiseCatchAggregateError(p, err);
	}
	return p.catch(_dummy ?? _dummyNull) as any
}

export function _ignoreError<P extends Promise<any>>(p: P, extraOptions?: IOptionsExtra<{}>, _dummy?: (e?: any) => any): P
{
	if (extraOptions?.returnStat)
	{
		return _promiseIgnoreError(p, _dummy)
	}

	return p
}
