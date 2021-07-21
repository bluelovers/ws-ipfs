import isIPFS from 'is-ipfs';
import ipfsServerList from 'ipfs-server-list';
import CID from 'cids';

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

	prefix?: {
		/**
		 * `https://ipfs.io/ipfs/`
		 */
		ipfs?: string,
		/**
		 * `https://explore.ipld.io/#/explore/`
		 */
		ipld?: string,
		/**
		 * `https://ipfs.io/ipns/`
		 */
		ipns?: string,
	},
}

export type IOptionsInput = IOptions | string;

export function isPath(cid: string | CID): cid is string
{
	if (CID.isCID(cid))
	{
		return false
	}

	return isIPFS.path(cid) || isIPFS.ipnsPath(cid) || isIPFS.cidPath(cid)
}

export function isCidOrPath(cid: string | CID): boolean
{
	return isIPFS.cid(cid) || isPath(cid)
}

export function pathToCid(cid: string | CID): string
{
	if (CID.isCID(cid))
	{
		return cid.toString()
	}

	return cid.replace(/^\/ip[nf]s\//, '')
}

export function toURL(cid: string | CID, options: IOptionsInput = {})
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

	let { filename, type } = options || {} as null;
	let prefix = options.prefix?.ipfs ?? ipfsServerList.ipfs.Gateway;

	switch (type)
	{
		case EnumIPFSLinkType.IPLD:
			prefix = options.prefix?.ipld ?? `https://explore.ipld.io/#/explore/`;
			break;
		case EnumIPFSLinkType.IPNS:
			//prefix = `https://gateway.ipfs.io/ipns/`;
			prefix = options.prefix?.ipns ?? `https://ipfs.io/ipns/`;
			break;
	}

	if (CID.isCID(cid))
	{
		cid = cid.toString()
	}
	else if (isPath(cid))
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

export function toPath(cid: string | CID, options?: IOptionsInput)
{
	return toURL(cid, options).pathname
}

export function toLink(cid: string | CID, options?: IOptionsInput)
{
	return toURL(cid, options).href
}

export default toURL
