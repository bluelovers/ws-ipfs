/**
 * Created by user on 2020/3/21.
 */

import { ICallback, ICIDValue, IDagHashAlg, IDagFormat, IDagNodeValue, ICIDObject } from '../types';
import { INetworkOptionsBase, IApiOptions } from '../options';

export type IIPFSDagReturnRemainderPath<T = {}> = T & ({
	remainderPath: string | '',
	remPath?: never,
} | {
	remainderPath?: never,
	remPath: string | '',
})

export interface IIPFSDagApiCore
{
	/**
	 * @example
	 * const obj = { simple: 'object' }
	 * const cid = await ipfs.dag.put(obj, { format: 'dag-cbor', hashAlg: 'sha3-512' })
	 * console.log(cid.toString())
	 */
	put(dagNode: IDagNodeValue, options?: IApiOptions<{
		format?: IDagFormat,
		hashAlg?: IDagHashAlg,
		cid?,
		pin?: boolean,
	}>): Promise<ICIDObject>,

	get<T extends any = any>(cid: ICIDValue, path?: string, options?: IApiOptions<{
		localResolve?: boolean,
	}>): Promise<IIPFSDagReturnRemainderPath<{
		value: T,
	}>>,

	tree<T extends string[]>(cid: ICIDValue, path?: string, options?: IApiOptions<{
		recursive?: boolean,
	}>): Promise<T>,

	resolve<T extends string[]>(cid: ICIDValue, path?: string, options?: IApiOptions): Promise<IIPFSDagReturnRemainderPath<{
		cid: ICIDObject,
	}>>,

}

export interface IIPFSDagApi
{
	/**
	 * https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/SPEC/DAG.md
	 */
	dag: IIPFSDagApiCore,
}

/**
 * @deprecated
 */
export interface IDagAPI
{
	put(dagNode: any, options: any, callback: ICallback<any>): void;

	put(dagNode: any, options: any): Promise<any>;

	get(cid: string | ICIDObject, path: string, options: any, callback: ICallback<any>): void;

	get(cid: string | ICIDObject, path: string, options: any): Promise<any>;

	get(cid: string | ICIDObject, path: string, callback: ICallback<any>): void;

	get(cid: string | ICIDObject, path: string): Promise<any>;

	get(cid: string | ICIDObject, callback: ICallback<any>): void;

	get(cid: string | ICIDObject): Promise<any>;

	tree(cid: string | ICIDObject, path: string, options: any, callback: ICallback<any>): void;

	tree(cid: string | ICIDObject, path: string, options: any): Promise<any>;

	tree(cid: string | ICIDObject, path: string, callback: ICallback<any>): void;

	tree(cid: string | ICIDObject, path: string): Promise<any>;

	tree(cid: string | ICIDObject, options: any, callback: ICallback<any>): void;

	tree(cid: string | ICIDObject, options: any): Promise<any>;

	tree(cid: string | ICIDObject, callback: ICallback<any>): void;

	tree(cid: string | ICIDObject): Promise<any>;
}
