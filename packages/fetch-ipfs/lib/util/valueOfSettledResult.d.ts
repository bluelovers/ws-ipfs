import { ITSUnpackedPromiseLike } from 'ts-type/lib/helper/unpacked';
import { IPublishToIPFSReturn } from '../put/types';
import { ITSValueOfArray } from 'ts-type/lib/helper';
export declare function valueOfSettledResult(settledResult: ITSValueOfArray<ITSUnpackedPromiseLike<IPublishToIPFSReturn>>): import("ipfs-types/lib/ipfs/file").IIPFSFileApiAddReturnEntry[];
