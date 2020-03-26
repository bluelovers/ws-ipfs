/**
 * Created by user on 2020/3/25.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
/**
 * https://blog.cloudflare.com/continuing-to-improve-our-ipfs-gateway/
 * @example
 * console.dir(cidToBase32(new CID('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco')))
 * console.dir(cidToBase32('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco'))
 */
export declare function cidToBase32(cid: ICIDValue): string;
