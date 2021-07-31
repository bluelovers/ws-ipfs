import { CID } from 'multiformats';
import err_code from 'err-code';
import { cid as is_cid } from 'is-ipfs';
import { LazyURL } from 'lazy-url';

export function _assertCID(hash: any)
{
	let bool: boolean;

	if (typeof hash === 'string')
	{
		bool = Boolean(CID.parse(hash))
	}
	else if (hash instanceof Uint8Array)
	{
		bool = Boolean(CID.decode(hash))
	}
	else if (hash)
	{
		bool = Boolean(CID.asCID(hash))
	}

	if (!bool)
	{
		throw err_code(new TypeError(`Invalid hash: ${hash}`), {
			hash,
		})
	}
}

export default _assertCID

export function _url_href(input: any)
{
	return (input as any as LazyURL).toRealString?.() ?? input.toString();
}

export function _if_path_can_be_cid(cidInput: string)
{
	return is_cid(_remove_path_prefix(cidInput))
}

export function _remove_path_prefix(cidInput: string)
{
	return cidInput.replace(/^\/?ip[fn]s\//, '')
}
