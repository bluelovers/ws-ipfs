import { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
export { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses };
export declare function some(ipfsClient: IIPFSClientFn, configs: IIPFSClientParameters[], skipCheck?: boolean): Promise<IIPFSClientReturn>;
export declare function getDefaultServerList(options?: {
    urlObject?: Partial<URL>;
}): IIPFSClientAddresses[];
export declare function find(ipfsHttpModule: IIPFSClientFn): (ipfsServerList: IIPFSClientAddresses[], options?: {
    skipCheck?: boolean;
    clientArgvs?: any[];
}) => Promise<IIPFSClientReturn>;
export declare function use(ipfsHttpModule: IIPFSClientFn): IIPFSClientFnWrap;
export default use;
