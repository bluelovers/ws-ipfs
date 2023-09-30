/**
 * Created by user on 2020/2/27.
 */
import _ipfsHttpModule, { Options } from 'ipfs-http-client';
import { ITSRequireAtLeastOne } from 'ts-type';
import { IIPFSAddressesURL } from 'ipfs-types';
export type IIPFSClientAddressesURL = ITSRequireAtLeastOne<IIPFSAddressesURL, 'host' | 'port'>;
export type IIPFSClientAddresses = string | IIPFSClientAddressesURL;
export type IArrayShift<T extends any[]> = T extends [any, ...infer U] ? U : never;
export type IIPFSClientParametersRest = IArrayShift<Parameters<typeof _ipfsHttpModule extends ((...any: any[]) => any) ? typeof _ipfsHttpModule : typeof _ipfsHttpModule["create"]>>;
export type IIPFSClientParametersFirst = (IIPFSClientAddresses | Options);
export type IIPFSClientParameters = [IIPFSClientParametersFirst?, ...IIPFSClientParametersRest] | [IIPFSClientParametersFirst?, ...any[]];
export type IIPFSClientReturn = ReturnType<typeof _ipfsHttpModule extends ((...any: any[]) => any) ? typeof _ipfsHttpModule : typeof _ipfsHttpModule["create"]>;
export type IIPFSClientFn = (...argvs: IIPFSClientParameters) => IIPFSClientReturn;
export type IIPFSClientFnWrap = (...argvs: IIPFSClientParameters) => Promise<IIPFSClientReturn>;
