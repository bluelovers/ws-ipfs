import isIPFS from 'is-ipfs';
import ipfsServerList from 'ipfs-server-list';
import { isCID, IToCIDInputValue } from '@lazy-ipfs/to-cid';
import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { cidToString } from '@lazy-ipfs/cid-to-string';
import {
	parsePath,

} from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { _getCidHashFromInput, _getPathFromInput } from './lib/util';
import err_code from 'err-code';
import { _invalidInput } from '@lazy-ipfs/parse-ipfs-path/lib/_invalidInput';
import { isParsePathResultLoose, _parsedPathIsCid } from '@lazy-ipfs/parse-ipfs-path/lib/util';
import { resultToPath, resultToPathWithNs } from '@lazy-ipfs/parse-ipfs-path/lib/formatter';

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

export function isPath(cid: IToCIDInputValue): cid is string
{
	if (isCID(cid) || _parsedPathIsCid(cid as any))
	{
		return false
	}

	// @ts-ignore
	return isIPFS.path(cid) || isIPFS.ipnsPath(cid) || isIPFS.cidPath(cid)
}

export function isCidOrPath(cid: IToCIDInputValue): boolean
{
	return isIPFS.cid(cid) || isPath(cid) || isCID(cid)
}

export function pathToCidSource(cid: IToCIDInputValue)
{
	if (!cid)
	{
		throw err_code(new TypeError(`Invalid input: ${cid}`), {
			cid,
		})
	}

	return parsePath(cid as any)
}

/**
 * @deprecated
 */
export function pathToCid(cid: IToCIDInputValue): string
{
	if (_invalidInput(cid))
	{
		throw err_code(new TypeError(`Invalid input: ${cid}`), {
			input: cid,
		})
	}

	return pathToCidSource(cid).toString()
}

export function toURL(cid: IToCIDInputValue, options: IOptionsInput = {})
{
	if (_invalidInput(cid))
	{
		throw err_code(new TypeError(`Invalid input: ${cid}`), {
			input: cid,
		})
	}

	if (typeof options === 'string')
	{
		options = {
			filename: options,
		}
	}

	cid = pathToCidSource(cid);

	if (!options.ignoreCheck && !isParsePathResultLoose(cid) && !isCidOrPath(cid))
	{
		throw err_code(new TypeError(`cid '${cid}' is not valid ipfs`), {
			cid,
			options,
		})
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

	if (isCID(cid))
	{
		cid = cidToString(cid)
	}
	else
	{
		let ret = parsePath(cid as any)
		cid = resultToPathWithNs(ret);
	}

	let url = new URL(`${prefix}${cid}`);

	if (typeof filename === 'string' && filename.length > 0)
	{
		url.searchParams.set('filename', filename)
	}

	return url;
}

export function toPath(cid: ICIDValue, options?: IOptionsInput)
{
	return toURL(cid, options).pathname
}

export function toLink(cid: ICIDValue, options?: IOptionsInput)
{
	return toURL(cid, options).href
}

export default toURL
