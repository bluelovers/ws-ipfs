import isIPFS from 'is-ipfs';

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
	ignoreCheck?: boolean,
}

export type IOptionsInput = IOptions | string;

export function isPath(cid: string): boolean
{
	return isIPFS.path(cid) || isIPFS.ipnsPath(cid) || isIPFS.cidPath(cid)
}

export function isCidOrPath(cid: string): boolean
{
	return isIPFS.cid(cid) || isPath(cid)
}

export function pathToCid(cid: string): string
{
	return cid.replace(/^\/ip[nf]s\//, '')
}

export function toURL(cid: string, options: IOptionsInput = {})
{
	if (typeof options === 'string')
	{
		options = {
			filename: options,
		}
	}

	if (!options.ignoreCheck && !isCidOrPath(cid))
	{
		throw new TypeError(`cid '${cid}' is not valid ipfs`)
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

	if (isPath(cid))
	{
		cid = pathToCid(cid)
	}

	let url = new URL(`${prefix}${cid}`);

	if (typeof filename === 'string' && filename.length > 0)
	{
		url.searchParams.set('filename', filename)
	}

	return url;
}

export function toPath(cid: string, options?: IOptionsInput)
{
	return toURL(cid, options).pathname
}

export function toLink(cid: string, options?: IOptionsInput)
{
	return toURL(cid, options).href
}

export default toURL
