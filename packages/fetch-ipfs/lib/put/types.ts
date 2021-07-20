/**
 * Created by user on 2020/3/27.
 */

import { PromiseSettledResult } from '../types';
import { AddResult } from 'ipfs-core-types/src/root';

export type IPublishToIPFSReturn = PromiseSettledResult<AddResult[], {
	error: Error,
	value: AddResult[],
}>[];

