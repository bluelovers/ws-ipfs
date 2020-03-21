/// <reference types="node" />
import { EventEmitter } from "events";
import { ITypes, IInitOptions, IVersion, IId, IRepoAPI, ISwarmAPI, IFilesAPI } from './types';
import { ICallback, IParametersWithCallbackWithMaybeArgv, IErrorLike } from '../types';
import { IIPFSFileApi } from './file';
import { IDagAPI, IIPFSDagApi } from './dag';
import { IIPFSRefsApi } from './refs';
import { IObjectAPI, IIPFSObjectApi } from './object';
export interface IIPFSApiReturnType {
    version: IVersion;
    id: IId;
    ping: {
        success: boolean;
        time: number;
        text: string;
    };
}
export interface IIPFSAsyncIterableApi extends IIPFSFileApi {
    /**
     * @example
     * for await (const res of ipfs.ping('Qmhash')) {
     * if (res.time) {
     * console.log(`Pong received: time=${res.time} ms`)
     * } else {
     * console.log(res.text)
     * }
}
     */
    ping(peerId: string, options?: {
        count?: number;
    }): AsyncIterable<IIPFSApiReturnType['ping']>;
}
export interface IIPFSApiUtils {
    version(options?: any): Promise<IIPFSApiReturnType['version']>;
    id(options?: any): Promise<IIPFSApiReturnType['id']>;
}
export interface IIPFSPromiseApi extends IIPFSAsyncIterableApi, IIPFSApiUtils, IIPFSDagApi, IIPFSRefsApi, IIPFSObjectApi {
}
export interface IIPFSCallbackApi {
    version(...argv: IParametersWithCallbackWithMaybeArgv<IIPFSApiReturnType['version']>): void;
    id(...argv: IParametersWithCallbackWithMaybeArgv<IIPFSApiReturnType['id']>): void;
}
export interface IIPFSEventEmitterApi {
    on(event: 'error', callback: (error: IErrorLike) => void): IIPFSInstance;
    on(event: string, callback: (...argv: any[]) => void): IIPFSInstance;
    once(event: string, callback: (...argv: any[]) => void): IIPFSInstance;
}
export declare type IIPFSInstanceWithEventEmitter = IIPFSEventEmitterApi & EventEmitter & IIPFSInstance;
export declare type IIPFSInstanceCoreApi = IIPFSCallbackApi & IIPFSPromiseApi & {};
/**
 * @todo update this
 * @deprecated
 */
export declare type IIPFSInstance = IIPFSInstanceCoreApi & {
    types: ITypes;
    init(options: IInitOptions, callback: ICallback<boolean>): void;
    init(callback: ICallback<boolean>): void;
    preStart(callback: ICallback<any>): void;
    start(callback?: ICallback<any>): void;
    stop(callback?: (error?: Error) => void): void;
    isOnline(): boolean;
    repo: IRepoAPI;
    bootstrap: any;
    config: any;
    block: any;
    object: IObjectAPI;
    dag: IDagAPI;
    libp2p: any;
    swarm: ISwarmAPI;
    files: IFilesAPI;
    bitswap: any;
    ping(callback: (error: Error) => void): void;
    ping(): Promise<void>;
    pubsub: any;
};
