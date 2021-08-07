/// <reference types="node" />
import { ICIDValueInput, IStaticCID } from '@lazy-ipfs/to-cid';
import { CID as MultiformatsCID } from 'multiformats';
import { ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { AssertionError } from 'assert';
export declare function newAssertionSameCIDError(actual: any, expected: any): AssertionError;
export declare function assertSameCID<C extends ICIDObject = MultiformatsCID>(a: ICIDValueInput, b: ICIDValueInput, libCID?: IStaticCID<C>): C;
export declare function isSameCID<C extends ICIDObject = MultiformatsCID>(a: ICIDValueInput, b: ICIDValueInput, libCID?: IStaticCID<C>): C;
export default isSameCID;
