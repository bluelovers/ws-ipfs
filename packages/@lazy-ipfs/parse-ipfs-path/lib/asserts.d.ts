import { IParsePathResult, IParsePathResultNsInput, IParsePathResultNsInputToEnum, IParsePathResultPath, IParsePathResultPathInput, IParsePathResultStrict } from './types';
export declare function assertToParsePathResultPath<P extends IParsePathResultPathInput>(path: P | unknown): asserts path is IParsePathResultPath<P>;
export declare const enum EnumParsePathResultNs {
    'ipfs' = "ipfs",
    'ipns' = "ipns"
}
export declare function assertToEnumNs<N extends IParsePathResultNsInput>(ns: N | unknown): asserts ns is IParsePathResultNsInputToEnum<N>;
export declare function assertToParsePathResult<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P | string, N | string>): asserts result is IParsePathResultStrict<H, IParsePathResultPath<P>, IParsePathResultNsInputToEnum<N>>;
export declare function isParsePathResult<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P | string, N | string> | unknown): result is IParsePathResultStrict<H, IParsePathResultPath<P>, IParsePathResultNsInputToEnum<N>>;
