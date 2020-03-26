/**
 * Created by user on 2020/3/24.
 */
import { IIPFSFileApi, IIPFSFileApiAddReturnEntry, IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import { IGlobSourceOptions } from './types';
export declare function addDirectoryToIPFS(ipfs: IIPFSFileApi, targetDirPath: string, { options, globSourceOptions, }?: {
    options?: IIPFSFileApiAddOptions;
    globSourceOptions?: IGlobSourceOptions;
}): Promise<{
    targetDirPath: string;
    root: IIPFSFileApiAddReturnEntry;
    files: IIPFSFileApiAddReturnEntry[];
}>;
export default addDirectoryToIPFS;
