import { ITSUnpackedPromiseLike, ITSPromiseSettledResult } from 'ts-type';
import { pokeAllURL } from '../pokeAllURL';
import { IPokeReturn, IPokeReturnBase, IPokeOptions, IPokeResult, IPokeResultWithValue } from '../types';
import { isPokeResultWithValue } from './asserts';

export function filterPokeAllSettledResultWithValue(settledResults: ITSPromiseSettledResult<IPokeResult>[])
{
	return settledResults.filter(v => isPokeResultWithValue(v.value)) as ITSPromiseSettledResult<IPokeResultWithValue>[]
}
