import { INetworkOptionsBase } from '../options';
import { ITSValueOrArray } from 'ts-type';
import { ICIDObject, ICIDValue } from '../types';

export interface IIPFSKeyApiCore
{

	gen<T extends string>(name: T, options?: {
		type?: 'rsa' | string,
		size?: number,
	}): Promise<{
		id: string,
		name: T,
	}>,

	list<T extends string>(): Promise<{
		id: string,
		name: string | T,
	}[]>

	rm<T extends string>(name: T): Promise<{
		id: string,
		name: T,
	}>

	rename<T extends string, N extends string>(oldName: T, newName: N): Promise<{
		id: string,
		was: T,
		now: N,
		overwrite: boolean,
	}>

	export(name: string, password: string): Promise<string>

	import<T extends string>(name: T, password: string): Promise<{
		id: string,
		name: T,
	}>
	import<T extends string>(name: T, pem: string, password: string): Promise<{
		id: string,
		name: T,
	}>

}

export interface IIPFSKeyApi
{
	/**
	 * https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/SPEC/PIN.md#pinadd
	 */
	key: IIPFSKeyApiCore,
}
