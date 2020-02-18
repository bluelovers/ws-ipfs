import _ipfsHttpModule from 'ipfs-http-client';
export declare type IIPFSClientParameters = Parameters<typeof _ipfsHttpModule>;
export declare type IIPFSClientReturn = ReturnType<typeof _ipfsHttpModule>;
export declare type IIPFSClientFn = (...argvs: IIPFSClientParameters) => IIPFSClientReturn;
export declare type IIPFSClientFnWrap = (...argvs: IIPFSClientParameters) => Promise<IIPFSClientReturn>;
export declare function some(ipfsClient: IIPFSClientFn, configs: IIPFSClientParameters[]): Promise<IIPFSClientReturn>;
export declare function use(ipfsHttpModule: IIPFSClientFn): IIPFSClientFnWrap;
export default use;
