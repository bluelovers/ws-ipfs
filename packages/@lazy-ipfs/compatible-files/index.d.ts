import { IPFS } from 'ipfs-core-types';
import { IPFSPath } from 'ipfs-core-types/src/utils';
import { CpOptions } from 'ipfs-core-types/src/files';
/**
 * @see https://github.com/ipfs/js-ipfs/issues/3747
 */
export declare function ipfsFilesCopy(ipfs: IPFS, from: IPFSPath | IPFSPath[], to: string, options?: CpOptions): Promise<void>;
