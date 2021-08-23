/**
 * Created by user on 2020/4/5.
 */
import { IPFS } from 'ipfs-core-types';
export declare function ipfsApiType(ipfs: Pick<IPFS, 'id' | 'version'>, timeout?: number): Promise<string | "js" | "go">;
export default ipfsApiType;
