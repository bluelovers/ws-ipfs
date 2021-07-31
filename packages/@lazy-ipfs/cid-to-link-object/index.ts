import { ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';

export interface ILinkObjectLike<T = string>
{
	'/': T
}

export function toLinkObjectLike<T = string>(cid: T): ILinkObjectLike<T>
{
	return {
		'/': cid,
	}
}

export function cidToLinkObjectLike<T = string, C = ICIDObject>(cid: C, handler?: (cid: C) => T)
{
	handler ??= (cid => cid.toString() as any as T);

	return toLinkObjectLike(handler(cid))
}

export default cidToLinkObjectLike
