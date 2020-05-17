/**
 * Created by user on 2020/5/17.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import { IRawCID } from '@lazy-ipfs/to-cid';
import { IIPFSAddressesLike } from 'ipfs-server-list';
export declare type IIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike> = Omit<T, 'GatewayDomain'> & {
    GatewayDomain: string;
};
export declare function assertIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): asserts gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>;
export declare function isIPFSAddressesLikeWithGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>;
export declare function assertGatewayDomain<T extends IIPFSAddressesLike = IIPFSAddressesLike>(gatewayDomain: T | any): asserts gatewayDomain is IIPFSAddressesLikeWithGatewayDomain<T>;
export declare function getGatewayDomain(gatewayDomain: string | IIPFSAddressesLike): string;
export declare function ipfsSubdomainURL(cid: ICIDValue | IRawCID, gatewayDomain?: string | IIPFSAddressesLike, protocol?: string | 'https:' | 'http:'): URL;
export declare function ipfsSubdomain(cid: ICIDValue | IRawCID, gatewayDomain?: string | IIPFSAddressesLike, protocol?: string | 'https:' | 'http:'): string;
export default ipfsSubdomain;
