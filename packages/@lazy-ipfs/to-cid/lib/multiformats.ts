import err_code from 'err-code';
import { CID as MultiformatsCID } from 'multiformats'
import { isRawJsCIDLike, SymbolJsCID, toRawJsCIDFake } from '@lazy-ipfs/detect-cid-lib/lib/js-cids';
import { ICIDValueInput, ICIDValueOrRaw } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { IRawMultiformatsCIDFake, isRawMultiformatsCIDLike, toRawMultiformatsCIDFake } from '@lazy-ipfs/detect-cid-lib/lib/js-multiformats';
import { _isArrayLike } from '@lazy-ipfs/detect-cid-lib/lib/util';
import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { _handleLibCID } from './_handleLibCID';
import { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';

export function toMultiformatsCID<T extends ICIDValueInput, C extends MultiformatsCID = MultiformatsCID>(cidInput: T, libCID?: Pick<typeof MultiformatsCID, 'parse' | 'decode' | 'asCID'> | EnumTypeofCID): C
{
	libCID = _handleLibCID(libCID, MultiformatsCID);

	if (typeof cidInput === 'string')
	{
		return libCID.parse(parsePath(cidInput, {
			unsafeReturn: true,
			noThrow: true,
		}).hash) as any
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
	}

	if (!cid)
	{
		throw err_code(new TypeError(`Invalid type for convert to MultiformatsCID`), {
			input: cidInput,
		})
	}

	return cid as any
}

export default toMultiformatsCID
