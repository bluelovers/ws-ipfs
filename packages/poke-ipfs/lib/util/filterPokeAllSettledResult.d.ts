import { ITSPromiseSettledResult } from 'ts-type';
import { IPokeReturnBase, IPokeResult } from '../types';
export declare function filterPokeAllSettledResultWithValue(settledResults: ITSPromiseSettledResult<IPokeResult>[]): ITSPromiseSettledResult<Omit<IPokeReturnBase, "value"> & {
    value: string;
}, any>[];
