export declare function filesToStreams(files: File[]): Promise<{
    path: string;
    content: any;
    size: number;
}[]>;
export default filesToStreams;
