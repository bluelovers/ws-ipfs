/**
 * Created by user on 2020/2/27.
 */
import _ipfsHttpModule, { Options } from 'ipfs-http-client';
import { ITSRequireAtLeastOne } from 'ts-type';
import { IIPFSAddressesURL } from 'ipfs-types';
export declare type IIPFSClientAddressesURL = ITSRequireAtLeastOne<IIPFSAddressesURL, 'host' | 'port'>;
export declare type IIPFSClientAddresses = string | IIPFSClientAddressesURL;
export declare type IArrayShift<T extends any[]> = T extends [any, ...infer U] ? U : never;
export declare type IIPFSClientParametersRest = IArrayShift<Parameters<typeof _ipfsHttpModule extends ((...any: any[]) => any) ? typeof _ipfsHttpModule : typeof _ipfsHttpModule["create"]>>;
export declare type IIPFSClientParametersFirst = (IIPFSClientAddresses | Options);
export declare type IIPFSClientParameters = [IIPFSClientParametersFirst?, ...IIPFSClientParametersRest] | [IIPFSClientParametersFirst?, ...any[]];
export declare type IIPFSClientReturn = ReturnType<typeof _ipfsHttpModule extends ((...any: any[]) => any) ? typeof _ipfsHttpModule : typeof _ipfsHttpModule["create"]>;
export declare type IIPFSClientFn = (...argvs: IIPFSClientParameters) => IIPFSClientReturn;
export declare type IIPFSClientFnWrap = (...argvs: IIPFSClientParameters) => Promise<IIPFSClientReturn>;
