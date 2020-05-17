/**
 * Created by user on 2020/3/25.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import CID from 'cids';
import toCID, { ICIDValueInput } from '@lazy-ipfs/to-cid';

/**
 * https://blog.cloudflare.com/continuing-to-improve-our-ipfs-gateway/
 * @example
 * console.dir(cidToBase32(new CID('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco')))
 * console.dir(cidToBase32('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco'))
 */
export function cidToBase32(cid: ICIDValueInput): string
{
	return toCID(cid).toV1().toBaseEncodedString('base32')
}
