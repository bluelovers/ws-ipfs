import { ITSUnpackedPromiseLike } from 'ts-type';
import { pokeAllURL } from '../pokeAllURL';
import pokeURL from '../pokeURL';
import { IPokeReturn, IPokeReturnBase, IPokeOptions, IPokeResult, IPokeResultWithValue } from '../types';

export function isPokeResultWithValue(pokeResult: IPokeResult): pokeResult is IPokeResultWithValue
{
	return !pokeResult.error && pokeResult.value !== false && pokeResult.value?.length > 0
}
