import {
	IParsePathResult, IParsePathResultNsInput,
	IParsePathResultNsInputToEnum,
	IParsePathResultPath,
	IParsePathResultPathInput,
} from './types';
import { assertToParsePathResult, EnumParsePathResultNs } from './asserts';

export function resultToPath<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P, N>): `/${IParsePathResultNsInputToEnum<N>}/${H}${IParsePathResultPath<P>}`
{
	assertToParsePathResult(result);

	return `/${result.ns}/${result.hash}${result.path ?? ''}` as null
}

export function resultToPathWithNs<H extends string, P extends IParsePathResultPathInput, N extends IParsePathResultNsInput = EnumParsePathResultNs>(result: IParsePathResult<H, P, N>): `${H}${IParsePathResultPath<P>}`
{
	assertToParsePathResult(result);

	return `${result.hash}${result.path ?? ''}` as null
}
