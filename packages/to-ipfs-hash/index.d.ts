/// <reference types="node" />
export interface IOptions {
}
export declare function ipfsHash(input: Buffer | string | AsyncIterable<Uint8Array>, options?: IOptions): Promise<string>;
export default ipfsHash;
