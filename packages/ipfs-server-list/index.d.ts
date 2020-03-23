import { ITSRequireAtLeastOne, ITSPartialRecord } from 'ts-type';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
export declare type ILimit = ITSPartialRecord<'ref' | 'id' | 'config', boolean>;
export declare type IIPFSAddressesLike = ITSRequireAtLeastOne<{
    "API"?: IIPFSClientAddresses;
    "Gateway"?: string;
    IPLD?: string;
    IPNS?: string;
}> & {
    /**
     * @deprecated
     */
    limit?: ITSRequireAtLeastOne<ILimit>;
};
export declare function getIpfsServerList(): Record<"infura.io" | "cloudflare" | "ipfs", IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>;
export declare function filterList<K extends keyof IIPFSAddressesLike>(key: K, serverList?: Record<string, IIPFSAddressesLike>): IIPFSAddressesLike[K][];
export declare const ipfsServerList: Record<"infura.io" | "cloudflare" | "ipfs", IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>;
export default ipfsServerList;
