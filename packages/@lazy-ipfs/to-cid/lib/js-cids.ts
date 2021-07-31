import JsCID from 'cids';
import { ICIDValueInput } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { IStaticCID, IToCIDInputValue } from '../index';
import toMultiformatsCID from './multiformats';
import { _handleLibCID } from './_handleLibCID';

export function toJsCID<T extends IToCIDInputValue, C extends JsCID = JsCID>(cidInput: T, libCID?: IStaticCID<C>): C
{
	libCID = _handleLibCID(libCID, JsCID);

	return new libCID((toMultiformatsCID(cidInput)?.toString()) ?? cidInput);
}
