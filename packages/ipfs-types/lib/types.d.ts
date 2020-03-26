/// <reference types="node" />
import CID from 'cids';
import { DAGNode, DAGLink } from 'ipld-dag-pb';
export declare type ICallback<T, E = Error, R = void> = (error: E, result?: T) => R;
export declare type IParametersWithCallbackWithMaybeArgv<T, Argv1 = any, E = Error> = [ICallback<T, E>] | [Argv1, ICallback<T, E>];
export interface IErrorLike {
    message: any;
}
export declare type ICIDObject = CID;
export declare type ICIDValue = ICIDObject | string;
export declare type IAsyncIterableAble<T> = Iterable<T> | AsyncIterable<T>;
export declare type IAsyncIterableAbleOrValue<T> = T | IAsyncIterableAble<T>;
export declare type IMtimeInput = Date | IMtime | number[] | [number, number];
export interface IMtime {
    secs: number;
    nsecs: number;
}
export declare type IMultihash = string | Buffer;
export declare type IDagNode = DAGNode & {
    readonly size: number;
    readonly Data: Buffer;
    readonly Links: any[];
    toJSON<T>(): T;
    toString(): string;
    addLink(link: any): any;
    rmLink(link: any): any;
    toDAGLink(options: any): any;
    serialize(): Buffer;
    _invalidateCached(): any;
};
export declare type IDAGLink = DAGLink & {
    Name: string;
    Hash: ICIDObject;
    Tsize: number;
};
export declare type IDagNodeCbor = Record<any, any>;
export declare type IDagNodeValue = IDagNodeCbor | IDagNode | {
    size?: any;
    Data?: any;
    Links?: any;
};
export declare type IDagFormat = string | 'dag-pb' | 'dag-cbor';
export declare type IDagHashAlg = string | 'sha2-256' | 'sha3-512';
