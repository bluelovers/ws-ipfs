
export function ipfsProtocolURL(cid: string, pathname?: string)
{
	let url = new URL(`ipfs://${cid}`);

	url.pathname = pathname;

	return url
}

export function ipfsProtocol(cid: string, pathname?: string)
{
	return ipfsProtocolURL(cid, pathname).href
}

export default ipfsProtocol
