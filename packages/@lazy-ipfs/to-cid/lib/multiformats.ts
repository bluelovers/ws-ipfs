import err_code from 'err-code';
import { CID as MultiformatsCID } from 'multiformats'
import { isRawJsCIDLike, SymbolJsCID, toRawJsCIDFake } from '@lazy-ipfs/detect-cid-lib/lib/js-cids';
import { ICIDValueInput, ICIDValueOrRaw } from '@lazy-ipfs/detect-cid-lib/lib/types';
import {
	IRawMultiformatsCIDFake,
	isRawMultiformatsCIDLike,
	toRawMultiformatsCIDFake,
} from '@lazy-ipfs/detect-cid-lib/lib/js-multiformats';
import { _isArrayLike } from '@lazy-ipfs/detect-cid-lib/lib/util';
import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { _handleLibCID } from './_handleLibCID';
import { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';
import { isCID, IToCIDInputValue } from '../index';
import { isParsePathResultLoose } from '@lazy-ipfs/parse-ipfs-path/lib/util';
import { isParsePathResult } from '@lazy-ipfs/parse-ipfs-path/lib/asserts';
import { cid as is_cid } from 'is-ipfs';
import {
	_handleFromURL,

} from '@lazy-ipfs/parse-ipfs-path/lib/_handleFromURL';
import { _if_path_can_be_cid, _remove_path_prefix, _url_href } from '@lazy-ipfs/is-cid';

export function toMultiformatsCID<T extends IToCIDInputValue, C extends MultiformatsCID = MultiformatsCID>(cidInput: T,
	libCID?: Pick<typeof MultiformatsCID, 'parse' | 'decode' | 'asCID'> | EnumTypeofCID,
): C
{
	libCID = _handleLibCID(libCID, MultiformatsCID);

	if (typeof cidInput === 'string' || cidInput instanceof URL)
	{
		// @ts-ignore
		cidInput = _url_href(cidInput as any) as string

		let ret;
		if (!_if_path_can_be_cid(cidInput))
		{
			if ((ret = _handleFromURL(cidInput)))
			{
				cidInput = ret.hash ?? ret;

				if (_if_path_can_be_cid(cidInput as any))
				{
					cidInput = _remove_path_prefix(cidInput as any) as any
				}
			}

			if (/[\/]/.test(cidInput as any))
			{
				cidInput = parsePath(cidInput as any, {
					unsafeReturn: true,
					noThrow: true,
				}).hash as any
			}
		}

		if (_if_path_can_be_cid(cidInput as any))
		{
			cidInput = _remove_path_prefix(cidInput as any) as any
		}

		return libCID.parse(cidInput as any) as any
	}
	else if (_isArrayLike(cidInput))
	{
		return libCID.decode(cidInput) as any
	}

	let cid = libCID.asCID(cidInput);

	if ((typeof cid === 'undefined' || cid === null))
	{
		if (isRawJsCIDLike(cidInput))
		{
			cid = libCID.asCID(toRawJsCIDFake(cidInput));
		}
		else if (isRawMultiformatsCIDLike(cidInput))
		{
			cid = libCID.asCID(toRawMultiformatsCIDFake(cidInput))
		}
		else if (isParsePathResultLoose(cidInput))
		{
			cid = toMultiformatsCID(cidInput.hash) as any
		}
	}

	if (!cid)
	{
		throw err_code(new TypeError(`Invalid type for convert to MultiformatsCID: ${cidInput}`), {
			input: cidInput,
		})
	}

	return cid as any
}

export default toMultiformatsCID
