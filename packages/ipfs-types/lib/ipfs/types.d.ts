/// <reference types="node" />
import { ICallback, IMultihash, ICIDObject, IErrorLike, IParametersWithCallbackWithMaybeArgv } from '../types';
import { IFileContent } from './file';
import { IObjectAPI } from './object';
import { IDagAPI } from './dag';
import { EventEmitter } from "events";
import { IIPFSPromiseApi, IIPFSApiReturnType } from './index';
export interface IInitOptions {
    emptyRepo?: boolean;
    bits?: number;
    log?: Function;
}
export interface IMultiaddr {
    buffer: Uint8Array;
}
export interface ITypes {
    Buffer: any;
    PeerId: any;
    PeerInfo: any;
    multiaddr: IMultiaddr;
    multihash: IMultihash;
    CID: ICIDObject;
}
/**
 * @deprecated
 */
export interface IRepoAPI {
    init(bits: number, empty: boolean, callback: ICallback<any>): void;
    version(options: any, callback: ICallback<any>): void;
    version(callback: ICallback<any>): void;
    gc(): void;
    path(): string;
}
/** old version? */
export interface IIPFSFile {
    path: string;
    hash: string;
    size: number;
    content?: IFileContent;
}
export interface IIPFSGetResult {
    depth: number;
    name: string;
    path: string;
    size: number;
    hash: Buffer;
    content: Buffer;
    type: 'file' | string;
}
/**
 * @deprecated
 */
export interface IFilesAPI {
    createAddStream(options: any, callback: ICallback<any>): void;
    createAddStream(callback: ICallback<any>): void;
    createPullStream(options: any): any;
    add(data: IFileContent, options: any, callback: ICallback<IIPFSFile[]>): void;
    add(data: IFileContent, options: any): Promise<IIPFSFile[]>;
    add(data: IFileContent, callback: ICallback<IIPFSFile[]>): void;
    add(data: IFileContent): Promise<IIPFSFile[]>;
    cat(hash: IMultihash, callback: ICallback<IFileContent>): void;
    cat(hash: IMultihash): Promise<IFileContent>;
    get(hash: IMultihash, callback: ICallback<IIPFSFile | IIPFSGetResult[]>): void;
    get(hash: IMultihash): Promise<IIPFSFile | IIPFSGetResult[]>;
    getPull(hash: IMultihash, callback: ICallback<any>): void;
}
export interface IPeersOptions {
    v?: boolean;
    verbose?: boolean;
}
export declare type IPeerId = any;
export interface IPeerInfo {
    id: IPeerId;
    multiaddr: IMultiaddr;
    multiaddrs: IMultiaddr[];
    distinctMultiaddr(): IMultiaddr[];
}
export interface IPeer {
    addr: IMultiaddr;
    peer: IPeerInfo;
}
/**
 * @deprecated
 */
export interface ISwarmAPI {
    peers(options: IPeersOptions, callback: ICallback<IPeer[]>): void;
    peers(options: IPeersOptions): Promise<IPeer[]>;
    peers(callback: ICallback<IPeer[]>): void;
    peers(): Promise<IPeer[]>;
    addrs(callback: ICallback<IPeerInfo[]>): void;
    addrs(): Promise<IPeerInfo[]>;
    localAddrs(callback: ICallback<IMultiaddr[]>): void;
    localAddrs(): Promise<IMultiaddr[]>;
    connect(maddr: IMultiaddr | string, callback: ICallback<any>): void;
    connect(maddr: IMultiaddr | string): Promise<any>;
    disconnect(maddr: IMultiaddr | string, callback: ICallback<any>): void;
    disconnect(maddr: IMultiaddr | string): Promise<any>;
    filters(callback: ICallback<void>): never;
}
export declare type IDAGNode = any;
export declare type IDAGLink = any;
export declare type IDAGLinkRef = IDAGLink | any;
export declare type IObj = BufferSource | Object;
export interface IObjectStat {
    Hash: IMultihash;
    NumLinks: number;
    BlockSize: number;
    LinksSize: number;
    DataSize: number;
    CumulativeSize: number;
}
export interface IPutObjectOptions {
    enc?: any;
}
export interface IGetObjectOptions {
    enc?: any;
}
/**
 * @deprecated
 */
export interface IObjectPatchAPI {
    addLink(multihash: IMultihash, link: IDAGLink, options: IGetObjectOptions, callback: ICallback<any>): void;
    addLink(multihash: IMultihash, link: IDAGLink, options: IGetObjectOptions): Promise<any>;
    addLink(multihash: IMultihash, link: IDAGLink, callback: ICallback<any>): void;
    addLink(multihash: IMultihash, link: IDAGLink): Promise<any>;
    rmLink(multihash: IMultihash, linkRef: IDAGLinkRef, options: IGetObjectOptions, callback: ICallback<any>): void;
    rmLink(multihash: IMultihash, linkRef: IDAGLinkRef, options: IGetObjectOptions): Promise<any>;
    rmLink(multihash: IMultihash, linkRef: IDAGLinkRef, callback: ICallback<any>): void;
    rmLink(multihash: IMultihash, linkRef: IDAGLinkRef): Promise<any>;
    appendData(multihash: IMultihash, data: any, options: IGetObjectOptions, callback: ICallback<any>): void;
    appendData(multihash: IMultihash, data: any, options: IGetObjectOptions): Promise<any>;
    appendData(multihash: IMultihash, data: any, callback: ICallback<any>): void;
    appendData(multihash: IMultihash, data: any): Promise<any>;
    setData(multihash: IMultihash, data: any, options: IGetObjectOptions, callback: ICallback<any>): void;
    setData(multihash: IMultihash, data: any, options: IGetObjectOptions): Promise<any>;
    setData(multihash: IMultihash, data: any, callback: ICallback<any>): void;
    setData(multihash: IMultihash, data: any): Promise<any>;
}
export interface IIPFSEventEmitterApi {
    on(event: 'error', callback: (error: IErrorLike) => void): IIPFSInstance;
    on(event: string, callback: (...argv: any[]) => void): IIPFSInstance;
    once(event: string, callback: (...argv: any[]) => void): IIPFSInstance;
}
export declare type IIPFSInstanceWithEventEmitter = IIPFSEventEmitterApi & EventEmitter & IIPFSInstance;
export interface IIPFSCallbackApi {
    version(...argv: IParametersWithCallbackWithMaybeArgv<IIPFSApiReturnType['version']>): void;
    id(...argv: IParametersWithCallbackWithMaybeArgv<IIPFSApiReturnType['id']>): void;
}
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
