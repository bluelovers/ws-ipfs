import { ITSPickRecordType, ITSRequireAtLeastOne, ITSValueOrArray } from 'ts-type'
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';

export enum EnumIPFSType
{
	Unknown,
	Client,
	Controller,
	ClientFallback,
}

export interface IOptionsExtra
{
	/**
	 * when use this, will skip check server is work or not
	 */
	fallbackServer?: IIPFSClientAddresses,
	useFallbackFirst?: boolean,
}

export interface IOptions extends Record<string, any>
{
	type?: string | 'js' | 'go' | 'proc';
	ipfsModule?: any;
	ipfsHttpModule?: any;
	ipfsBin?: string;
	ipfsOptions?: {
		EXPERIMENTAL?: {
			pubsub?: boolean;
			ipnsPubsub?: boolean;
			sharding?: boolean;
			dht?: boolean;
		};
		relay?: {
			enabled?: boolean;
			hop?: {
				enabled?: boolean;
			};
		};
		[k: string]: any
	};
	disposable?: boolean;
}

