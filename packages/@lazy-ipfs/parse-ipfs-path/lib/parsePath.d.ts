import { EnumParsePathResultNs } from './asserts';
import { IParsePathInputValue, IParsePathResultPathInput, IParsePathResultStrict } from './types';
export declare function parsePath<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue, options?: {
    noThrow?: boolean;
    unsafeReturn?: boolean;
}): IParsePathResultStrict<H, P, N>;
