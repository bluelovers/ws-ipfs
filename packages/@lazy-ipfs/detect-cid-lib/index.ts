import { isMultiformatsCID, isRawMultiformatsCIDLike } from './lib/js-multiformats';
import { isJsCID, isRawJsCIDLike } from './lib/js-cids';
import err_code from 'err-code';

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
}

export function typeofCID(cid: any, throwError?: boolean)
{
	if (isJsCID(cid))
	{
		return EnumTypeofCID.js_cids
	}
	else if (isMultiformatsCID(cid))
	{
		return EnumTypeofCID.multiformats_cid
	}
	else if (throwError)
	{
		throw err_code(new TypeError(`Unknown type of cid`), {
			input: cid,
		})
	}
}

export function typeofRawCID(cid: any, throwError?: boolean)
{
	if (isRawJsCIDLike(cid))
	{
		return EnumTypeofCID.js_cids
	}
	else if (isRawMultiformatsCIDLike(cid))
	{
		return EnumTypeofCID.multiformats_cid
	}
	else if (throwError)
	{
		throw err_code(new TypeError(`Unknown type of raw cid`), {
			input: cid,
		})
	}
}

export default typeofCID
