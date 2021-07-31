import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { IOptions as IToURLOptions } from 'to-ipfs-url';
import { IPFS } from 'ipfs-core-types';
import { LazyURL } from 'lazy-url';
export interface IOptions {
    handleOptions?: Omit<IToURLOptions, 'prefix'>;
    serverList?: string[];
    ipfsGatewayList?: string[];
    ipfsGatewayDomainList?: string[];
}
export declare function makeIpfsGatewayAddressesURLAsync(cid: ICIDValue, options: Omit<IOptions, 'serverList'> & {
    ipfs: IPFS;
}): Promise<URL>;
export declare function makeIpfsGatewayURLList(cid: ICIDValue, options?: IOptions): URL[];
export declare function makeIpfsGatewayDomainURLList(cid: ICIDValue, options?: IOptions): URL[];
export declare function makeShareIpfsURL(cid: ICIDValue, server?: string): LazyURL;
export declare function lazyMakeIpfsAllServerURL(cid: ICIDValue, options?: IOptions): URL[];
export declare function _notAllowedAddress(url: URL | string): boolean;
export default lazyMakeIpfsAllServerURL;
