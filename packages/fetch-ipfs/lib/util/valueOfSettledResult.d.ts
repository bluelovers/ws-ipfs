import { ITSUnpackedPromiseLike } from 'ts-type/lib/helper/unpacked';
import { IPublishToIPFSReturn } from '../put/types';
import { ITSValueOfArray } from 'ts-type/lib/helper';
import { AddResult } from 'ipfs-core-types/src/root';
export declare function valueOfSettledResult(settledResult: ITSValueOfArray<ITSUnpackedPromiseLike<IPublishToIPFSReturn>>): AddResult[];
