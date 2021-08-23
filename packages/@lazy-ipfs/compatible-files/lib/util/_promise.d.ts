import { IOptionsExtra } from '../types';
import { AggregateErrorExtra } from 'lazy-aggregate-error';
export declare function _promiseIgnoreError<P extends Promise<any>>(p: P, _dummy?: (e?: any) => any, err?: AggregateErrorExtra): P;
export declare function _ignoreError<P extends Promise<any>>(p: P, extraOptions?: IOptionsExtra<{}>, _dummy?: (e?: any) => any): P;
