
export interface IOptions
{
	pathname?: string;
	path?: string;
}

export type IOptionsCore = IOptions & {
	ns: 'ipfs' | 'ipns';
} & ({
	cid: string,
	hash?: undefined,
} | {
	cid?: undefined,
	hash: string,
})

export function _ipfsProtocolURL(options: IOptionsCore)
{
	let cid = options.cid ?? options.hash;
	let ns = options.ns ?? 'ipfs';

	let url = new URL(`${ns}://${cid}`);

	let pathname = options.pathname ?? options.path;

	if (typeof pathname === 'string' && pathname.length)
	{
		url.pathname = pathname;
	}

	return url
}

export function ipnsProtocolURL(cid: string, pathname?: string | IOptions)
{
	if (typeof pathname !== 'object')
	{
		pathname = {
			pathname,
		}
	}

	return _ipfsProtocolURL({
		...pathname,
		ns: 'ipns',
		cid,
	})
}

export function ipfsProtocolURL(cid: string, pathname?: string | IOptions)
{
	if (typeof pathname !== 'object')
	{
		pathname = {
			pathname,
		}
	}

	return _ipfsProtocolURL({
		...pathname,
		ns: 'ipfs',
		cid,
	})
}

export function ipfsProtocol(cid: string, pathname?: string | IOptions)
{
	return ipfsProtocolURL(cid, pathname).href
}

export function ipnsProtocol(cid: string, pathname?: string | IOptions)
{
	return ipnsProtocolURL(cid, pathname).href
}

export default ipfsProtocol
