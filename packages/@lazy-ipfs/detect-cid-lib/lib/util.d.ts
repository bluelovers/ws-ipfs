import { I_CIDLike, ICIDObject } from './types';
export declare function _isArrayLike<T extends Pick<any[], number | 'length'>>(input: any): input is T;
export declare function _isCIDLike<T extends I_CIDLike = ICIDObject>(cid: any): cid is T;
