import { ICallback, IMultihash, ICIDObject } from '../types';

export interface IInitOptions
{
	emptyRepo?: boolean;
	bits?: number;
	log?: Function;
}

export interface IMultiaddr
{
	buffer: Uint8Array;
}

export interface ITypes
{
	Buffer: any;
	PeerId: any;
	PeerInfo: any;
	multiaddr: IMultiaddr;
	multihash: IMultihash;
	CID: ICIDObject;
}

export interface IVersion
{
	version: string;
	repo: string;
	commit: string;
}

export interface IId
{
	id: string;
	publicKey: string;
	addresses: IMultiaddr[];
	agentVersion: string;
	protocolVersion: string;
}

/**
 * @deprecated
 */
export interface IRepoAPI
{
	init(bits: number, empty: boolean, callback: ICallback<any>): void;

	version(options: any, callback: ICallback<any>): void;

	version(callback: ICallback<any>): void;

	gc(): void;

	path(): string;
}

export type IFileContent = Object | Blob | string;

/** old version? */
export interface IIPFSFile
{
	path: string;
	hash: string;
	size: number;
	content?: IFileContent;
}

export interface IIPFSGetResult
{
	depth: number,
	name: string,
	path: string,
	size: number,
	hash: Buffer,
	content: Buffer,
	type: 'file' | string;
}

/**
 * @deprecated
 */
export interface IFilesAPI
{
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

export interface IPeersOptions
{
	v?: boolean;
	verbose?: boolean;
}

export type IPeerId = any;

export interface IPeerInfo
{
	id: IPeerId;
	multiaddr: IMultiaddr;
	multiaddrs: IMultiaddr[];

	distinctMultiaddr(): IMultiaddr[];
}

export interface IPeer
{
	addr: IMultiaddr;
	peer: IPeerInfo;
}

/**
 * @deprecated
 */
export interface ISwarmAPI
{
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

export type IDAGNode = any;
export type IDAGLink = any;
export type IDAGLinkRef = IDAGLink | any;
export type IObj = BufferSource | Object;

export interface IObjectStat
{
	Hash: IMultihash;
	NumLinks: number;
	BlockSize: number;
	LinksSize: number;
	DataSize: number;
	CumulativeSize: number;
}

export interface IPutObjectOptions
{
	enc?: any;
}

export interface IGetObjectOptions
{
	enc?: any;
}

export interface IObjectPatchAPI
{
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

