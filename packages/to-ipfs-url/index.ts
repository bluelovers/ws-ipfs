import { cid as isIPFS } from 'is-ipfs';

export enum EnumIPFSLinkType
{
	ipfs = 'ipfs',
	ipld = 'ipld',
	ipns = 'ipns',

	Gateway = 'ipfs',

	IPFS = 'ipfs',
	IPLD = 'ipld',
	IPNS = 'ipns',
}

export interface IOptions
{
	type?: EnumIPFSLinkType | string,
	filename?: string,
}

export type IOptionsInput = IOptions | string;

export function toURL(cid: string, options: IOptionsInput = {})
{
	if (!isIPFS(cid))
	{
		throw new TypeError(`cid '${cid}' is not valid ipfs`)
	}

	if (typeof options === 'string')
	{
		options = {
			filename: options,
		}
	}

	let { filename, type } = options || {};
	let prefix = `https://ipfs.io/ipfs/`;

	switch (type)
	{
		case EnumIPFSLinkType.IPLD:
			prefix = `https://explore.ipld.io/#/explore/`;
			break;
		case EnumIPFSLinkType.IPNS:
			//prefix = `https://gateway.ipfs.io/ipns/`;
			prefix = `https://ipfs.io/ipns/`;
			break;
	}

	let url = new URL(`${prefix}${cid}`);

	if (typeof filename === 'string' && filename.length > 0)
	{
		url.searchParams.set('filename', filename)
	}

	return url;
}

export function toLink(cid: string, options?: IOptionsInput)
{
	return toURL(cid, options).href
}

export default toURL
