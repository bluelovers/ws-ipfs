import { IPokeOptions, IPokeResult } from './types';
import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
export declare function pokeAllURL(ipfsURL: (URL | string)[], options?: IPokeOptions): Bluebird<ITSPromiseSettledResult<IPokeResult>[]>;
