import { ITSRequireAtLeastOne, ITSPartialRecord } from 'ts-type';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
export declare type ILimit = ITSPartialRecord<'ref' | 'id' | 'config', boolean>;
export declare type IIPFSAddressesLike = ITSRequireAtLeastOne<{
    API?: IIPFSClientAddresses;
    Gateway?: string;
    IPLD?: string;
    IPNS?: string;
    /**
     * https://blog.cloudflare.com/continuing-to-improve-our-ipfs-gateway/
     *
     * base32.cf-ipfs.com
     */
    GatewayDomain?: string;
}> & {
    /**
     * @deprecated
     */
    limit?: ITSRequireAtLeastOne<ILimit>;
};
export declare function getIpfsServerList(): Record<"ipfs" | "infura.io" | "cloudflare", any> & Record<string, any>;
export declare function filterList<K extends keyof IIPFSAddressesLike>(key: K, serverList?: Record<string, IIPFSAddressesLike>): any[];
export declare const ipfsServerList: Record<"ipfs" | "infura.io" | "cloudflare", any> & Record<string, any>;
export default ipfsServerList;
