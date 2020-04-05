import { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
import { getDefaultServerList } from './util';
export { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses };
export { getDefaultServerList };
export declare function some(ipfsClient: IIPFSClientFn, configs: IIPFSClientParameters[], skipCheck?: boolean): Promise<IIPFSClientReturn>;
export declare function find(ipfsHttpModule: IIPFSClientFn): (ipfsServerList: IIPFSClientAddresses[], options?: {
    skipCheck?: boolean;
    clientArgvs?: any[];
}) => Promise<IIPFSClientReturn>;
export declare function use(ipfsHttpModule: IIPFSClientFn): IIPFSClientFnWrap;
export default use;
