import { IParsePathResult, IParsePathResultStrict } from './types';
export declare function _isStringObject(input: any): input is string;
export declare function _isEmptyPath(path: string): boolean;
export declare function _invalidPath(path: string): boolean;
export declare function _isDefined<T>(path: T): path is NonNullable<T>;
export declare function _parsedPathIsCid(input: IParsePathResultStrict): boolean;
export declare function _parsedPathIsPath(input: IParsePathResultStrict): boolean;
export declare function isParsePathResultLoose(result: IParsePathResult | any): result is IParsePathResult;
