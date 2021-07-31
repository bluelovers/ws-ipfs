import { ITSUnpackedPromiseLike, ITSPromiseSettledResult } from 'ts-type';
import { pokeAllURL } from '../pokeAllURL';
import { IPokeReturn, IPokeReturnBase, IPokeOptions, IPokeResult, IPokeResultWithValue } from '../types';
import { isPokeResultWithValue } from './asserts';

export function filterPokeAllSettledResultWithValue(settledResults: ITSPromiseSettledResult<IPokeResult>[])
{
	return settledResults.filter(v => isPokeResultWithValue(v.value)) as ITSPromiseSettledResult<IPokeResultWithValue>[]
}

export function getPokeAllSettledResultWithHref(settledResults: ITSPromiseSettledResult<IPokeResult>[])
{
	return filterPokeAllSettledResultWithValue(settledResults).map(value  => value.value.href).filter(Boolean)
}
