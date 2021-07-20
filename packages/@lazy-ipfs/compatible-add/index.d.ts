import { IPFS } from 'ipfs-core-types';
export declare function addAll<T>(ipfs: Pick<IPFS, 'addAll'>, ...argv: Parameters<IPFS["addAll"]>): AsyncIterable<import("ipfs-core-types/src/root").AddResult>;
export declare function addAllPromise<T>(ipfs: Pick<IPFS, 'addAll'>, ...argv: Parameters<IPFS["addAll"]>): Promise<import("ipfs-core-types/src/root").AddResult[]>;
export declare function add<T>(ipfs: Pick<IPFS, 'addAll'>, ...argv: Parameters<IPFS["addAll"]>): Promise<import("ipfs-core-types/src/root").AddResult>;
export default addAll;
