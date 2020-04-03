import { IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import { IGlobSourceOptions } from './types';
import { IIPFSFilesApi } from 'ipfs-types/lib/ipfs/files';
export declare function addDirectoryToIPFS(ipfs: IIPFSFilesApi & IIPFSFilesApi, targetDirPath: string, { options, globSourceOptions, ignoreExists, }?: {
    options?: IIPFSFileApiAddOptions;
    globSourceOptions?: IGlobSourceOptions;
    ignoreExists?: boolean;
}): Promise<{
    targetDirPath: string;
    root: {
        cid: any;
    };
    files: {
        path: string;
    }[];
}>;
export default addDirectoryToIPFS;
