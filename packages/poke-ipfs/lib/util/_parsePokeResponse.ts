import parseIpfsFromHeader from '@lazy-ipfs/parse-ipfs-from-header';
import { IPokeReturn, IPokeReturnBase, IPokeOptions, IPokeResultWithValue } from '../types';

export function _parsePokeResponse(res: Response)
{
	const { headers, status, statusText } = res;

	const xIpfsPath = parseIpfsFromHeader(headers).xIpfsPath;

	if (xIpfsPath)
	{
		return {
			value: xIpfsPath as string,
			status,
			statusText,
			headers,
			href: res.url,
		} as IPokeResultWithValue
	}
	else if (status < 200 || status >= 400)
	{
		return {
			value: false as false,
			status,
			statusText,
			headers,
			href: res.url,
		} as IPokeReturn<{
			value: false,
		}>
	}

	return {
		value: null as void,
		status,
		statusText,
		headers,
		href: res.url,
	} as IPokeReturn
}

export function _pokeError(error: Error, href: string)
{
	return {
		error,
		href,
	} as IPokeReturn<{
		error: Error;
	}>
}
