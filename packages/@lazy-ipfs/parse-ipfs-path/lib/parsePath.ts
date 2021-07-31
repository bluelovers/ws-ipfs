import err_code from 'err-code';
import { parsePathCore } from './parsePathCore';
import { EnumParsePathResultNs } from './asserts';
import { IParsePathInputValue, IParsePathResultPathInput, IParsePathResultStrict } from './types';

export function parsePath<H extends string = string, P extends IParsePathResultPathInput = string, N extends EnumParsePathResultNs = EnumParsePathResultNs>(input: IParsePathInputValue,
	options?: {
		noThrow?: boolean,
		unsafeReturn?: boolean,
	},
): IParsePathResultStrict<H, P, N>
{
	try
	{
		return parsePathCore(input)
	}
	catch (e)
	{
		if (!options?.noThrow && !options?.unsafeReturn)
		{
			throw err_code(e, {
				originalInput: input,
				options,
			})
		}
	}

	if (options?.unsafeReturn)
	{
		return {
			ns: EnumParsePathResultNs.ipfs,
			hash: input,
			path: '',
		} as null
	}
}

