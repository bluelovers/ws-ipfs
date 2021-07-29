import { isMultiformatsCID, isRawMultiformatsCIDLike } from './lib/js-multiformats';
import { isJsCID, isRawJsCIDLike } from './lib/js-cids';
import err_code from 'err-code';

export { SymbolJsCID } from './lib/js-cids';

export * from './lib/js-cids';
export * from './lib/js-multiformats';
export * from './lib/util';
export * from './lib/types';

export const enum EnumTypeofCID
{
	/**
	 * for typo
	 * @deprecated
	 */
	js_cid = '@ipld/js-cid/CID',
	js_cids = '@ipld/js-cid/CID',
	multiformats_cid = '@ipld/js-multiformats/CID',
	js_multiformats = '@ipld/js-multiformats/CID',
	js_multiformat = '@ipld/js-multiformats/CID',
}

export function typeofCID(cid: unknown, throwError?: boolean)
{
	if (isMultiformatsCID(cid))
	{
		return EnumTypeofCID.multiformats_cid
	}
	else if (isJsCID(cid))
	{
		return EnumTypeofCID.js_cids
	}
	else if (throwError)
	{
		throw err_code(new TypeError(`Unknown type of cid`), {
			input: cid,
		})
	}
}

export function typeofRawCID(cid: unknown, throwError?: boolean)
{
	if (isRawMultiformatsCIDLike(cid))
	{
		return EnumTypeofCID.multiformats_cid
	}
	else if (isRawJsCIDLike(cid))
	{
		return EnumTypeofCID.js_cids
	}
	else if (throwError)
	{
		throw err_code(new TypeError(`Unknown type of raw cid`), {
			input: cid,
		})
	}
}

export default typeofCID
