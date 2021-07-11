import { IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import { IGlobSourceOptions } from './types';
import { IPFS } from 'ipfs-core-types';
export declare function addDirectoryToIPFS(ipfs: IPFS, targetDirPath: string, { options, globSourceOptions, ignoreExists, }?: {
    options?: IIPFSFileApiAddOptions;
    globSourceOptions?: IGlobSourceOptions;
    ignoreExists?: boolean;
}): Promise<{
    targetDirPath: string;
    root: {
        cid: any;
    };
    files: {
        length: number;
    };
}>;
export default addDirectoryToIPFS;
