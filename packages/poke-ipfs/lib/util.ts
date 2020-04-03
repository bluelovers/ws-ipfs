/**
 * Created by user on 2020/4/3.
 */

export function corsURL(url: URL | string, cors?: boolean)
{
	let protocol = 'https:';

	if (typeof url === 'string')
	{
		url = new URL(url.toString());
	}

	if (typeof window !== 'undefined')
	{
		cors = cors ?? window.location.host === url.host;
		protocol = window.location.protocol || protocol;
	}

	if (cors === true)
	{
		return new URL(`${protocol}//cors-anywhere.herokuapp.com/${url.toString()}`)
	}

	return url
}
