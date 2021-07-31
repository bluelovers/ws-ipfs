import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { EnumParsePathResultNs } from './asserts';

export type IParsePathResultNsInput = 'ipfs' | 'ipns' | EnumParsePathResultNs;
export type IParsePathResultNsInputToEnum<T extends string> = T extends 'ipfs'
	? EnumParsePathResultNs.ipfs
	: T extends 'ipns'
		? EnumParsePathResultNs.ipns
		: T extends EnumParsePathResultNs
			? T
			: T extends string
				? EnumParsePathResultNs
				: never
	;
export type IParsePathResultPathInput = string;
export type IParsePathResultPath<P> = P extends null ? ''
	: P extends undefined ? ''
		: P extends void ? ''
			: P extends never ? ''
				: P
	;

export interface IParsePathResult<H extends string = string, P extends IParsePathResultPathInput = string, N extends string | IParsePathResultNsInput = IParsePathResultNsInput>
{
	ns: N;
	hash: H;
	path?: P;
}

export interface IParsePathResultStrict<H extends string = string, P extends IParsePathResultPathInput = string, N extends IParsePathResultNsInput = IParsePathResultNsInput> extends Omit<IParsePathResult<H, P, N>, 'path' | 'ns'>
{
	ns: IParsePathResultNsInputToEnum<N>;
	path: IParsePathResultPath<P>;
}

export type IParsePathInputValue = ICIDValue | Uint8Array;
