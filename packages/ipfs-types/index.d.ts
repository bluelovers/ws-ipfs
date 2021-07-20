/**
 * Created by user on 2020/2/27.
 */
import type { ITSPickRecordType } from 'ts-type';
export type { IIPFSOptions } from './lib/options';
export type { IIPFSPromiseApi } from './lib/ipfs/index';
import { AbortOptions } from 'ipfs-core-types/src/utils';
import { IPFS } from 'ipfs-core-types';
import { EndpointConfig } from 'ipfs-http-client';
import { IIPFSConfigApiCore } from './lib/ipfs/config';
declare module 'ipfs-core-types/src/config' {
    interface API<OptionExtension = {}> {
        get<T>(key: string, options?: AbortOptions & OptionExtension): Promise<T>;
    }
}
declare module 'ipfs-core-types/src/root' {
    interface Directory {
        content?: undefined;
    }
}
export declare type IIPFSExtendType2<OptionExtension = {}> = {
    config: IIPFSConfigApiCore<OptionExtension>;
};
export declare type IIPFSExtendTypePick<Key extends keyof IPFS, OptionExtension = {}> = Pick<IIPFSExtendType<IPFS, OptionExtension>, Key>;
export declare type IIPFSExtendType<IPFS, OptionExtension = {}> = IPFS & IIPFSExtendType2<OptionExtension>;
export declare type IPFSHttpClient<OptionExtension = {}> = IPFS & {
    getEndpointConfig(): EndpointConfig;
} & IIPFSExtendType<OptionExtension>;
export declare type IIPFSAddressesURL = Partial<Omit<ITSPickRecordType<URL, string>, 'port'>> & {
    port?: number | string;
    protocol?: 'https' | 'http' | string;
};
export interface IIPFSAddresses {
    "Swarm": string[];
    "API": string;
    "Gateway": string;
    "Delegates": string[];
}
