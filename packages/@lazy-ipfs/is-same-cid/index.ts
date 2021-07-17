
import { ICIDValueInput, toCID, IStaticCID } from '@lazy-ipfs/to-cid';
import CID from 'cids';

export function isSameCID<C extends CID = CID>(a: ICIDValueInput, b: ICIDValueInput, libCID?: IStaticCID<C>)
{
	if (a && b)
	{
		let c = toCID(a, libCID);

		if (c.toV1().toString('base32') === toCID(b, libCID).toV1().toString('base32'))
		{
			return c as C
		}

		return false as null
	}

	return null as null
}

export default isSameCID
