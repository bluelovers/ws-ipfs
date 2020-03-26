import { INetworkOptionsBase, IApiOptions } from '../options';
import { ICallback, IMultihash, IDagNodeValue, IDagNode, ICIDObject } from '../types';
import { IDAGNode, IObj, IPutObjectOptions, IGetObjectOptions, IDAGLink, IObjectStat, IObjectPatchAPI } from './types';

export interface IIPFSObjectApiCorePatch
{

	addLink(multihash: IMultihash, link: IDAGLink | {
		name: string,
		size: number,
		cid: ICIDObject,
	}, options?: {
		enc?
	}): Promise<ICIDObject>

	rmLink(multihash: IMultihash, link: IDAGLink | {
		name: string,
	}, options?: {
		enc?
	}): Promise<ICIDObject>

	appendData(multihash: IMultihash, data: Buffer, options?: {
		enc?
	}): Promise<ICIDObject>

	setData(multihash: IMultihash, data: Buffer, options?: {
		enc?
	}): Promise<ICIDObject>

}

export interface IIPFSObjectApiCore
{

	"new"(template?: 'unixfs-dir' | string): Promise<ICIDObject>

	put(obj: IDagNode | Buffer | {
		Data,
		Links: any[],
	}, options?: {
		enc?
	}): Promise<ICIDObject>

	/**
	 * Fetch a MerkleDAG node
	 */
	get(multihash: IMultihash, options?: {
		enc?: string,
	} & INetworkOptionsBase): Promise<IDagNode>

	/**
	 * Returns the Data field of an object
	 */
	data(multihash: IMultihash, options?: IApiOptions<{
		enc?: string,
	}>): Promise<Buffer>

	links(multihash: IMultihash, options?: IApiOptions<{
		enc?: string,
	}>): Promise<IDAGLink>

	/**
	 * Returns stats about an Object
	 */
	stat(multihash: IMultihash, options?: INetworkOptionsBase): Promise<{
		Hash: string,
		NumLinks: number,
		BlockSize: number,
		LinksSize: number,
		DataSize: number,
		CumulativeSize: number
	}>

	patch: IIPFSObjectApiCorePatch

}

export interface IIPFSObjectApi
{
	object: IIPFSObjectApiCore,
}

/**
 * @deprecated
 */
export interface IObjectAPI
{
	"new"(template: 'unixfs-dir', callback: ICallback<IDAGNode>): void;

	"new"(callback: ICallback<IDAGNode>): void;

	"new"(): Promise<IDAGNode>;

	put(obj: IObj, options: IPutObjectOptions, callback: ICallback<any>): void;

	put(obj: IObj, options: IPutObjectOptions): Promise<any>;

	put(obj: IObj, callback: ICallback<any>): void;

	put(obj: IObj): Promise<any>;

	get(multihash: IMultihash, options: IGetObjectOptions, callback: ICallback<any>): void;

	get(multihash: IMultihash, options: IGetObjectOptions): Promise<any>;

	get(multihash: IMultihash, callback: ICallback<any>): void;

	get(multihash: IMultihash): Promise<any>;

	data(multihash: IMultihash, options: IGetObjectOptions, callback: ICallback<any>): void;

	data(multihash: IMultihash, options: IGetObjectOptions): Promise<any>;

	data(multihash: IMultihash, callback: ICallback<any>): void;

	data(multihash: IMultihash): Promise<any>;

	links(multihash: IMultihash, options: IGetObjectOptions, callback: ICallback<IDAGLink[]>): void;

	links(multihash: IMultihash, options: IGetObjectOptions): Promise<IDAGLink[]>;

	links(multihash: IMultihash, callback: ICallback<IDAGLink[]>): void;

	links(multihash: IMultihash): Promise<IDAGLink[]>;

	stat(multihash: IMultihash, options: IGetObjectOptions, callback: ICallback<IObjectStat>): void;

	stat(multihash: IMultihash, options: IGetObjectOptions): Promise<IObjectStat>;

	stat(multihash: IMultihash, callback: ICallback<IObjectStat>): void;

	stat(multihash: IMultihash): Promise<IObjectStat>;

	patch: IObjectPatchAPI;
}
