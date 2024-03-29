import toCID, { isCID, IToCIDInputValue } from '@lazy-ipfs/to-cid';
import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import isIPFS from 'is-ipfs';
import { isPath } from '../index';
import { _handleFromURL } from '@lazy-ipfs/parse-ipfs-path/lib/_handleFromURL';
import { isParsePathResultLoose } from '@lazy-ipfs/parse-ipfs-path/lib/util';
import { resultToPath } from '@lazy-ipfs/parse-ipfs-path/lib/formatter';

export function _getCidHashFromInput(cid: IToCIDInputValue)
{
	if (isIPFS.cid(cid))
	{
		return cid
	}
	else if (isPath(cid))
	{
		return cid.replace(/^\/ip[nf]s\//, '')
	}
	else if (isCID(cid))
	{
		return cid
	}

	cid = _handleFromURL(cid as any) ?? cid;

	if (isParsePathResultLoose(cid))
	{
		return cid.hash;
	}

	cid = parsePath(cid as any, {
		noThrow: true,
	}) ?? cid;

	if (isParsePathResultLoose(cid))
	{
		return cid.hash;
	}

	return cid
}

export function _getPathFromInput(cid: IToCIDInputValue)
{
	cid = _handleFromURL(cid as any) ?? cid;

	if (isParsePathResultLoose(cid))
	{
		return resultToPath(cid) as string;
	}

	return _getCidHashFromInput(cid).toString()
}
