import { ITSValueOrArray, ITSResolvable } from 'ts-type';
import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import Bluebird from 'bluebird';
export declare type IUseIPFSInput = string | Partial<IIPFSPromiseApi> | IIPFSClientAddresses;
export declare function handleClientList(useIPFS: ITSValueOrArray<IUseIPFSInput>, filter?: (ipfs: Partial<IIPFSPromiseApi>) => ITSResolvable<boolean>): Bluebird<IIPFSPromiseApi[]>;
