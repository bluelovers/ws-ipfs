import { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses } from './lib/types';
import { getDefaultServerList } from './util';
import { IPFS } from 'ipfs-core-types';
import _ipfsHttpModule from 'ipfs-http-client';
import { ITSResolvable } from 'ts-type/lib/generic';
export { IIPFSClientFnWrap, IIPFSClientFn, IIPFSClientReturn, IIPFSClientParameters, IIPFSClientAddressesURL, IIPFSClientAddresses };
export { getDefaultServerList };
export declare function getCreateClientFn(ipfsClient: any): IIPFSClientFn;
export declare function some(ipfsClient: IIPFSClientFn | typeof _ipfsHttpModule, configs: IIPFSClientParameters[], skipCheck?: boolean, checkIPFSFn?: (ipfs: IPFS) => ITSResolvable<boolean>): Promise<IIPFSClientReturn>;
export declare function find(ipfsHttpModule: IIPFSClientFn | typeof _ipfsHttpModule): (ipfsServerList: IIPFSClientAddresses[], options?: {
    skipCheck?: boolean;
    clientArgvs?: any[];
    checkIPFSFn?(ipfs: IPFS): ITSResolvable<boolean>;
}) => Promise<IIPFSClientReturn>;
export declare function use(ipfsHttpModule: IIPFSClientFn | typeof _ipfsHttpModule): IIPFSClientFnWrap;
export default use;
