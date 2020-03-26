import { IIPFSFileApi, IIPFSFileApiAddOptions, IIPFSFileApiAddReturnEntry } from 'ipfs-types/lib/ipfs/file';
import { IGlobSourceOptions } from './types';
export declare function addDirectoryToIPFS(ipfs: IIPFSFileApi, targetDirPath: string, { options, globSourceOptions, }?: {
    options?: IIPFSFileApiAddOptions;
    globSourceOptions?: IGlobSourceOptions;
}): Promise<{
    targetDirPath: string;
    root: IIPFSFileApiAddReturnEntry;
    files: {
        length: number;
    };
}>;
export default addDirectoryToIPFS;
