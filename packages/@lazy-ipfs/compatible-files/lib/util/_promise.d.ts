import { IOptionsExtra } from '../types';
export declare function _promiseIgnoreError<P extends Promise<any>>(p: P, _dummy?: (e?: any) => any): P;
export declare function _ignoreError<P extends Promise<any>>(p: P, extraOptions?: IOptionsExtra<{}>, _dummy?: (e?: any) => any): P;
