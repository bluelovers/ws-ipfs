/**
 * Created by user on 2020/2/27.
 */
import _ipfsHttpModule from 'ipfs-http-client';
import ITB from 'ts-toolbelt';
import { ITSRequireAtLeastOne } from 'ts-type';
import { IIPFSAddressesURL } from 'ipfs-types';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
export declare type IIPFSClientAddressesURL = ITSRequireAtLeastOne<IIPFSAddressesURL, 'host' | 'port'>;
export declare type IIPFSClientAddresses = string | IIPFSClientAddressesURL;
export declare type IIPFSClientParametersRest = ITB.T.Drop<Parameters<typeof _ipfsHttpModule>, '0', '->'>;
export declare type IIPFSClientParameters = [IIPFSClientAddresses?, ...IIPFSClientParametersRest] | [IIPFSClientAddresses?, ...any[]];
export declare type IIPFSClientReturn = ReturnType<typeof _ipfsHttpModule> & IIPFSPromiseApi;
export declare type IIPFSClientFn = (...argvs: IIPFSClientParameters) => IIPFSClientReturn;
export declare type IIPFSClientFnWrap = (...argvs: IIPFSClientParameters) => Promise<IIPFSClientReturn>;
