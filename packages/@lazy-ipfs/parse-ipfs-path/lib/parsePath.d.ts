/// <reference types="node" />
import CID from 'cids';
export declare const enum EnumParsePathResultNs {
    'ipfs' = "ipfs",
    'ipns' = "ipns"
}
export declare type IParsePathResultNsInput = 'ipfs' | 'ipns' | EnumParsePathResultNs;
export declare type IParsePathResultNsInputToEnum<T extends string> = T extends 'ipfs' ? EnumParsePathResultNs.ipfs : T extends 'ipns' ? EnumParsePathResultNs.ipns : T extends EnumParsePathResultNs ? T : T extends string ? EnumParsePathResultNs : never;
export declare type IParsePathResultPathInput = string;
export declare type IParsePathResultPath<P> = P extends null ? '' : P extends undefined ? '' : P extends void ? '' : P extends never ? '' : P;
export interface IParsePathResult<H extends string = string, P extends IParsePathResultPathInput = string, N extends string | IParsePathResultNsInput = IParsePathResultNsInput> {
    ns: N;
    hash: H;
    path?: P;
}
export interface IParsePathResultStrict<H extends string = string, P extends IParsePathResultPathInput = string, N extends IParsePathResultNsInput = IParsePathResultNsInput> extends Omit<IParsePathResult<H, P, N>, 'path' | 'ns'> {
    ns: IParsePathResultNsInputToEnum<N>;
    path: IParsePathResultPath<P>;
}
/**
 * @see https://github.com/tableflip/dweb-path
 */
export declare function parsePathCore<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: string | Buffer | CID): IParsePathResultStrict<H, P, N>;
export declare function parsePath<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: string | Buffer | CID, options?: {
    noThrow?: boolean;
}): IParsePathResultStrict<H, P, N>;
export declare function assertToEnumNs<N extends IParsePathResultNsInput>(ns: N | unknown): asserts ns is IParsePathResultNsInputToEnum<N>;
export declare function assertToParsePathResultPath<P extends IParsePathResultPathInput>(path: P | unknown): asserts path is IParsePathResultPath<P>;
export declare function assertToParsePathResult<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P | string, N | string>): asserts result is IParsePathResultStrict<H, IParsePathResultPath<P>, IParsePathResultNsInputToEnum<N>>;
export declare function resultToPath<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P, N>): `/${IParsePathResultNsInputToEnum<N>}/${H}${IParsePathResultPath<P>}`;
export declare function strToCidToStr(str: string): string;
