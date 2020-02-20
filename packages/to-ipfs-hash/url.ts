import urlSource from 'ipfs-utils/src/files/url-source';
import ipfsHash, { IOptions } from './index';
import BufferList from 'bl/BufferList';

export async function fromUrl(url: string, options?: IOptions)
{
	const buf = new BufferList();
	for await (const file of urlSource(url))
	{
		for await (const chunk of file.content)
		{
			buf.append(chunk)
		}
	}

	return ipfsHash(buf, options)
}

export default fromUrl
