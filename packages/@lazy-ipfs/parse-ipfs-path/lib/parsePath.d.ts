/// <reference types="node" />
import CID from 'cids';
export declare const enum EnumParsePathResultNs {
    'ipfs' = "ipfs",
    'ipns' = "ipns"
}
export interface IParsePathResult {
    ns: 'ipfs' | 'ipns' | EnumParsePathResultNs;
    hash: string;
    path: string;
    toString(): string;
    toJSON(): string;
}
/**
 * @see https://github.com/tableflip/dweb-path
 */
export declare function parsePath(input: string | Buffer | CID): IParsePathResult;
export declare function resultToPath(result: IParsePathResult): string;
export declare function strToCidToStr(str: string): string;
