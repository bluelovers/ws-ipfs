import { ICIDValueInput, toCID, IStaticCID } from '@lazy-ipfs/to-cid';
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
import { ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import cidToString, { cidToQmHash } from '@lazy-ipfs/cid-to-string/index';
import { AssertionError } from 'assert';
import { inspect } from 'util';

export function newAssertionSameCIDError(actual, expected)
{
	return new AssertionError({
		actual: inspect(actual),
		expected: inspect(expected),
		operator: 'isSameCID',
		stackStartFn: newAssertionSameCIDError,
	})
}

export function assertSameCID<C extends ICIDObject = MultiformatsCID>(a: ICIDValueInput,
	b: ICIDValueInput,
	libCID?: IStaticCID<C>,
)
{
	let ret = isSameCID(a, b, libCID);

	if (!ret)
	{
		throw newAssertionSameCIDError(a, b)
	}

	return ret
}

export function isSameCID<C extends ICIDObject = MultiformatsCID>(a: ICIDValueInput,
	b: ICIDValueInput,
	libCID?: IStaticCID<C>,
)
{
	if (a && b)
	{
		let c: C;

		if (cidToQmHash(c = toCID(a, libCID)) === cidToQmHash(toCID(b, libCID)))
		{
			return c as C
		}

		return false as null
	}

	return null as null
}

export default isSameCID
