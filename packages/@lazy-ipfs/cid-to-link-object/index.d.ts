import CID from 'cids';
export interface ILinkObjectLike<T = string> {
    '/': T;
}
export declare function toLinkObjectLike<T = string>(cid: T): ILinkObjectLike<T>;
export declare function cidToLinkObjectLike<T = string, C = CID>(cid: C, handler?: (cid: C) => T): ILinkObjectLike<T>;
export default cidToLinkObjectLike;
