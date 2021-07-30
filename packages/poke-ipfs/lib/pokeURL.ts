/**
 * Created by user on 2020/4/3.
 */
import fetch from 'cross-fetch';
import { IPokeReturn, IPokeReturnBase, IPokeOptions } from './types';
import { corsURL } from './util';
import { AbortControllerTimer } from 'abort-controller-timer';
import { RequestInit, RequestInfo, Response } from 'node-fetch';
import { getUnSafeAgent } from 'unsafe-https-agent';
import { _parsePokeResponse, _pokeError } from './util/_parsePokeResponse';
import { _handleOptions } from './util/_handleOptions';

export function pokeURL(ipfsURL: URL | string, options?: IPokeOptions)
{
	let url = corsURL(ipfsURL.toString(), options?.cors);

	const { fetchOptions, controller } = _handleOptions(options);

	return fetch(url.href, fetchOptions as any)
		.then(_parsePokeResponse)
		.catch(e => _pokeError(e, url.href))
		.finally(() => controller?.abort())
}

export default pokeURL
