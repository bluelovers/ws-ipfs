/// <reference types="node" />
export interface IOptions {
}
export declare function ipfsHash(input: Buffer | string | AsyncIterable<Buffer>, options?: IOptions): Promise<string>;
export default ipfsHash;
