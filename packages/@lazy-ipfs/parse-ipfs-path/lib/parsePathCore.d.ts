import { EnumParsePathResultNs } from './asserts';
import { IParsePathInputValue, IParsePathResultPathInput, IParsePathResultStrict } from './types';
/**
 * @see https://github.com/tableflip/dweb-path
 */
export declare function _parsePathCore<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue): IParsePathResultStrict<H, P, N>;
export declare function parsePathCore<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue): IParsePathResultStrict<H, P, N>;
