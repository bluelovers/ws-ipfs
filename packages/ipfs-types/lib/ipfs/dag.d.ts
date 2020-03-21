/**
 * Created by user on 2020/3/21.
 */
import { ICallback, ICIDValue, IDagHashAlg, IDagFormat, IDagNodeValue, ICIDObject } from '../types';
import { INetworkOptionsBase } from '../options';
export interface IIPFSDagApiCore {
    put(dagNode: IDagNodeValue, options?: {
        format?: IDagFormat;
        hashAlg?: IDagHashAlg;
        cid?: any;
        pin?: boolean;
    } & INetworkOptionsBase): Promise<ICIDObject>;
    get<T>(cid: ICIDValue, path?: any, options?: {
        localResolve?: boolean;
    } & INetworkOptionsBase): Promise<T>;
    tree<T extends string[]>(cid: ICIDValue, path?: any, options?: {
        recursive?: boolean;
    } & INetworkOptionsBase): Promise<T>;
}
export interface IIPFSDagApi {
    /**
     * https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/SPEC/DAG.md
     */
    pin: IIPFSDagApiCore;
}
export interface IDagAPI {
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
