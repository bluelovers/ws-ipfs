import { RequestInit } from 'node-fetch';
import { getUnSafeAgent } from 'unsafe-https-agent';
import { AbortControllerTimer } from 'abort-controller-timer';
import { allSettled } from 'bluebird-allsettled';
import pokeURL from './pokeURL';
import fetch from 'cross-fetch';
import { IPokeReturn, IPokeReturnBase, IPokeOptions, IPokeResult } from './types';
import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
import { _handleOptions } from './util/_handleOptions';

export function pokeAllURL(ipfsURL: (URL | string)[], options?: IPokeOptions): Bluebird<ITSPromiseSettledResult<IPokeResult>[]>
{
	const opts = _handleOptions(options);

	return allSettled([ipfsURL].flat().map(ipfsURL => pokeURL(ipfsURL, opts)))
}
