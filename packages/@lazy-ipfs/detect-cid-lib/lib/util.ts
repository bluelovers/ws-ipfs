import { I_CIDLike, ICIDObject } from './types';

export function _isArrayLike<T extends Pick<any[], number | 'length'>>(input: any): input is T
{
	const type = typeof input;

	return Array.isArray(input) || type !== 'function' && type !== 'string' && typeof input?.length === 'number' && typeof input.forEach === 'function' && typeof input.slice === 'function';
}

export function _isCIDLike<T extends I_CIDLike = ICIDObject>(cid: any): cid is T
{
	return typeof cid?.version === 'number' && typeof cid.multihash !== 'undefined'
}
