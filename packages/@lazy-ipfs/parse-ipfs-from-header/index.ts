import valueFromRecord, { keyFromRecord } from 'value-from-record';

export function parseIpfsFromHeader(headers: Headers | Record<string, any>)
{
	let xIpfsPath = headers.get?.('x-ipfs-path') || headers.get?.['X-Ipfs-Path'] || valueFromRecord('x-ipfs-path', headers);

	return {
		xIpfsPath,
	}
}

export default parseIpfsFromHeader
