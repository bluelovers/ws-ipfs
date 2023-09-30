import { ITSValueOrArray, ITSResolvable } from 'ts-type';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';
export type IUseIPFSInput = string | Partial<IPFS> | IIPFSClientAddresses;
export declare function handleClientList(useIPFS: ITSValueOrArray<IUseIPFSInput>, filter?: (ipfs: Partial<IPFS>) => ITSResolvable<boolean>): Bluebird<IIPFSPromiseApi[]>;
