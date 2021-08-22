import { AggregateErrorExtra } from 'lazy-aggregate-error';
export declare function _promiseCatchAggregateError<P extends Promise<any>>(p: P, err?: AggregateErrorExtra): Promise<any>;
