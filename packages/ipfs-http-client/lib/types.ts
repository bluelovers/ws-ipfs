/**
 * Created by user on 2020/2/27.
 */
import _ipfsHttpModule from 'ipfs-http-client'
import ITB from 'ts-type/ts-toolbelt';
import { ITSRequireAtLeastOne } from 'ts-type';
import { IIPFSAddressesURL } from 'ipfs-types';

export type IIPFSClientAddressesURL = ITSRequireAtLeastOne<IIPFSAddressesURL, 'host' | 'port'>
export type IIPFSClientAddresses = string | IIPFSClientAddressesURL

export type IIPFSClientParametersRest = ITB.T.Drop<Parameters<typeof _ipfsHttpModule>, '0', '->'>

export type IIPFSClientParameters = [IIPFSClientAddresses?, ...IIPFSClientParametersRest] | [IIPFSClientAddresses?, ...any[]]
export type IIPFSClientReturn = ReturnType<typeof _ipfsHttpModule>

export type IIPFSClientFn = (...argvs: IIPFSClientParameters) => IIPFSClientReturn
export type IIPFSClientFnWrap = (...argvs: IIPFSClientParameters) => Promise<IIPFSClientReturn>
