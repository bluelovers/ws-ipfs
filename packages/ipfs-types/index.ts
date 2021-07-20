/**
 * Created by user on 2020/2/27.
 */

import type { ITSPickRecordType } from 'ts-type';
export type { IIPFSOptions } from './lib/options';
export type { IIPFSPromiseApi } from './lib/ipfs/index';
import { API as ConfigAPI } from 'ipfs-core-types/src/config';
import { AbortOptions } from 'ipfs-core-types/src/utils';
import { IPFS } from 'ipfs-core-types';
import { EndpointConfig } from 'ipfs-http-client';
import { IIPFSConfigApi, IIPFSConfigApiCore } from './lib/ipfs/config';

declare module 'ipfs-core-types/src/config'
{
	interface API<OptionExtension = {}>
	{
		// @ts-ignore
		get<T>(key: string, options?: AbortOptions & OptionExtension): Promise<T>
	}
}

export type IIPFSExtendType2<OptionExtension = {}> = {
	config: IIPFSConfigApiCore<OptionExtension>
}

export type IIPFSExtendTypePick<Key extends keyof IPFS, OptionExtension = {}> = Pick<IIPFSExtendType<IPFS, OptionExtension> , Key>

export type IIPFSExtendType<IPFS, OptionExtension = {}> = IPFS & IIPFSExtendType2<OptionExtension>

export type IPFSHttpClient<OptionExtension = {}> = IPFS & {
	getEndpointConfig(): EndpointConfig;
} & IIPFSExtendType<OptionExtension>

export type IIPFSAddressesURL = Partial<Omit<ITSPickRecordType<URL, string>, 'port'>> & {
	port?: number | string,
	protocol?: 'https' | 'http' | string,
}

export interface IIPFSAddresses
{
	"Swarm": string[],
	"API": string,
	"Gateway": string,
	"Delegates": string[]
}
