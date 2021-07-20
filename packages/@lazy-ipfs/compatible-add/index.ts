import itLast from 'it-last';
import itAll from 'it-all';
import { IPFS } from 'ipfs-core-types';

export function addAll<T>(ipfs: Pick<IPFS, 'addAll'>, ...argv: Parameters<IPFS["addAll"]>)
{
	return (ipfs.addAll ?? ((ipfs as IPFS).add) as any as IPFS["addAll"])(...argv)
}

export function addAllPromise<T>(ipfs: Pick<IPFS, 'addAll'>, ...argv: Parameters<IPFS["addAll"]>)
{
	return itAll(addAll(ipfs, ...argv))
}

export function add<T>(ipfs: Pick<IPFS, 'addAll'>, ...argv: Parameters<IPFS["addAll"]>)
{
	return itLast(addAll(ipfs, ...argv))
}

export default addAll
