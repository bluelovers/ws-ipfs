import multiaddrToUri from 'multiaddr-to-uri';

export interface IMultiaddrToURLOptions
{
	/**
	 * When /tcp is the last (terminating) protocol HTTP is assumed by default (implicit assumeHttp: true)
	 * this means produced URIs will start with http:// instead of tcp://
	 * passing { assumeHttp: false } disables this behavior
	 *
	 * @default true
	 */
	assumeHttp?: boolean;
}

export function multiaddrToURL(multiaddr: string, opts?: IMultiaddrToURLOptions)
{
	return new URL(multiaddrToUri(multiaddr, opts))
}

export default multiaddrToURL
