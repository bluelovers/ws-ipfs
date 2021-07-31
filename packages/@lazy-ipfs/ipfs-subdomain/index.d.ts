import { IIPFSAddressesLike } from 'ipfs-server-list';
import { IParsePathResult } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import { ICIDValueOrRaw } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare type IIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike> = Omit<T, 'GatewayDomain'> & {
    GatewayDomain: string;
};
export declare function assertIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): asserts gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>;
export declare function isIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>;
export declare function assertGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): asserts gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>;
export declare function getGatewayDomain(gatewayDomain: string | IIPFSAddressesLike): string;
export declare function toSubdomainCID(cid: ICIDValueOrRaw): string;
export declare type ISubdomainInput = ICIDValueOrRaw | IParsePathResult;
/**
 * @deprecated use {@link ipfsSubdomainURL2}
 */
export declare function ipfsSubdomainURL(cid: ISubdomainInput, gatewayDomain?: string | IIPFSAddressesLike, protocol?: string | 'https:' | 'http:'): URL;
export interface IOptions {
    gatewayDomain?: string | IIPFSAddressesLike;
    protocol?: string | 'https:' | 'http:';
    clearPathname?: boolean;
    filename?: string;
}
export declare function _handleOptions(cid: ISubdomainInput, gatewayDomain?: string | IIPFSAddressesLike, protocol?: IOptions["protocol"] | IOptions, options?: IOptions): {
    cid: ISubdomainInput;
    gatewayDomain: string | IIPFSAddressesLike;
    protocol: string | IOptions;
    options: IOptions;
};
export declare function ipfsSubdomainURL2(cid: ISubdomainInput, gatewayDomain?: string | IIPFSAddressesLike, protocol?: IOptions["protocol"] | IOptions, options?: IOptions): URL;
export declare function ipfsSubdomain(cid: ISubdomainInput, gatewayDomain?: string | IIPFSAddressesLike, protocol?: IOptions["protocol"] | IOptions, options?: IOptions): string;
export default ipfsSubdomain;
