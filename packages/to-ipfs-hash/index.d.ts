/// <reference types="node" />
export declare type IOptions = any;
export declare function ipfsHash(input: Buffer | string | AsyncIterable<Buffer>, options?: IOptions): Promise<string>;
export default ipfsHash;
