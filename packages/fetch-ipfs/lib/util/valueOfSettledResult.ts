import { ITSUnpackedPromiseLike } from 'ts-type/lib/helper/unpacked';
import { IPublishToIPFSReturn } from '../put/types';
import { ITSValueOfArray } from 'ts-type/lib/helper';

export function valueOfSettledResult(settledResult: ITSValueOfArray<ITSUnpackedPromiseLike<IPublishToIPFSReturn>>)
{
	return settledResult.value ?? settledResult.reason?.value
}
