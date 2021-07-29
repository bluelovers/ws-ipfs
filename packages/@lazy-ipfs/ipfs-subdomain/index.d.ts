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
export declare function ipfsSubdomainURL(cid: ICIDValueOrRaw | IParsePathResult, gatewayDomain?: string | IIPFSAddressesLike, protocol?: string | 'https:' | 'http:'): URL;
export interface IOptions {
    gatewayDomain?: string | IIPFSAddressesLike;
    protocol?: string | 'https:' | 'http:';
    clearPathname?: boolean;
}
export declare function ipfsSubdomain(cid: ICIDValueOrRaw, gatewayDomain?: string | IIPFSAddressesLike, protocol?: IOptions["protocol"] | IOptions, options?: IOptions): string;
export default ipfsSubdomain;
