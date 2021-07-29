import { ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
export interface ILinkObjectLike<T = string> {
    '/': T;
}
export declare function toLinkObjectLike<T = string>(cid: T): ILinkObjectLike<T>;
export declare function cidToLinkObjectLike<T = string, C = ICIDObject>(cid: C, handler?: (cid: C) => T): ILinkObjectLike<T>;
export default cidToLinkObjectLike;
