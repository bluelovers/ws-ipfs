import multiaddrToUri from 'multiaddr-to-uri';

export function multiaddrToURL(multiaddr: string, opts?: {
	assumeHttp?: boolean,
})
{
	return new URL(multiaddrToUri(multiaddr, opts))
}

export default multiaddrToURL
