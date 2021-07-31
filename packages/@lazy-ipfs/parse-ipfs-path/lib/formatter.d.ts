import { IParsePathResult, IParsePathResultNsInput, IParsePathResultNsInputToEnum, IParsePathResultPath, IParsePathResultPathInput } from './types';
import { EnumParsePathResultNs } from './asserts';
export declare function resultToPath<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P, N>): `/${IParsePathResultNsInputToEnum<N>}/${H}${IParsePathResultPath<P>}`;
export declare function resultToPathWithNs<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P, N>): `${H}${IParsePathResultPath<P>}`;
