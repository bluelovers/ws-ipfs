import _urlSource from 'ipfs-utils/src/files/url-source';
import ipfsHash, { IOptions } from './index';
import { HTTPOptions } from 'ipfs-utils/dist/src/types';

export function urlSource(url: string, options?: IOptions & HTTPOptions)
{
	return _urlSource(url, options);
}

export async function fromUrl(url: string, options?: IOptions & HTTPOptions)
{
	const file = urlSource(url);
	return ipfsHash(file.content, options)
}

export default fromUrl
