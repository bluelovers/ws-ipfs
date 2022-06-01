import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
import { IOptions as IToURLOptions } from 'to-ipfs-url';
import { IOptions as ISubdomainURLOptions } from '@lazy-ipfs/ipfs-subdomain';
import { IPFS } from 'ipfs-core-types';
import { LazyURL } from 'lazy-url';
import { IToCIDInputValue } from '@lazy-ipfs/to-cid';
export interface IOptions {
    handleOptions?: Omit<IToURLOptions, 'prefix'> & Omit<ISubdomainURLOptions, 'gatewayDomain'>;
    serverList?: string[];
    ipfsGatewayList?: string[];
    ipfsGatewayDomainList?: string[];
}
export declare function makeIpfsGatewayAddressesURLAsync(cid: IToCIDInputValue, options: Omit<IOptions, 'serverList'> & {
    ipfs: IPFS;
}): Promise<URL>;
export declare function makeIpfsGatewayURLList(cid: IToCIDInputValue, options?: IOptions): URL[];
export declare function makeIpfsGatewayDomainURLList(cid: IToCIDInputValue, options?: IOptions): URL[];
export declare function makeShareIpfsURL(cid: ICIDValue, server?: string): LazyURL;
export declare function lazyMakeIpfsAllServerURL(cid: IToCIDInputValue, options?: IOptions): URL[];
export declare function _notAllowedAddress(url: URL | string): boolean;
export default lazyMakeIpfsAllServerURL;
