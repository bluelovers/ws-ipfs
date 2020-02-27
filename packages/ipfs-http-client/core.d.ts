import { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
export { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses };
export declare function some(ipfsClient: IIPFSClientFn, configs: IIPFSClientParameters[], skipCheck?: boolean): Promise<IIPFSClientReturn>;
export declare function use(ipfsHttpModule: IIPFSClientFn): IIPFSClientFnWrap;
export default use;
