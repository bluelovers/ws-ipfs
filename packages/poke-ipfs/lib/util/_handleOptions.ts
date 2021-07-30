import { IPokeOptions } from '../types';
import { RequestInit } from 'node-fetch';
import { getUnSafeAgent } from 'unsafe-https-agent';
import { AbortControllerTimer } from 'abort-controller-timer';

export function _handleOptions(options?: IPokeOptions)
{
	options ??= {};

	let fetchOptions: RequestInit = {
		method: 'HEAD',
		...options.fetchOptions,
	};

	fetchOptions.agent ??= getUnSafeAgent();
	fetchOptions.signal ??= options.signal;

	let controller: AbortControllerTimer;

	if (!fetchOptions.signal)
	{
		controller = new AbortControllerTimer(options?.timeout || 10 * 1000);
		fetchOptions.signal = controller.signal;
	}

	return {
		...options,
		fetchOptions,
		controller,
	}
}
