import { IFile } from 'pull-file-reader2/types';
export interface IFilesToStreams {
    path: string;
    content(end: any, cb: any): any;
    size: number;
}
export declare function filesToStreams(files: IFile[]): Promise<IFilesToStreams[]>;
export default filesToStreams;
