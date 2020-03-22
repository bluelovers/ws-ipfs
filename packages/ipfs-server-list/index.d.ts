import { ITSRequireAtLeastOne, ITSPartialRecord } from 'ts-type';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
export declare type ILimit = ITSPartialRecord<'ref' | 'id' | 'config', boolean>;
export declare type IIPFSAddressesLike = ITSRequireAtLeastOne<{
    "API": IIPFSClientAddresses;
    "Gateway": string;
    limit?: ITSRequireAtLeastOne<ILimit>;
}>;
export declare function getIpfsServerList(): Record<"infura.io" | "cloudflare", ITSRequireAtLeastOne<{
    API: IIPFSClientAddresses;
    Gateway: string;
    limit?: ITSRequireAtLeastOne<ITSPartialRecord<"id" | "config" | "ref", boolean>, "id" | "config" | "ref">;
}, "API" | "Gateway" | "limit">> & Record<string, ITSRequireAtLeastOne<{
    API: IIPFSClientAddresses;
    Gateway: string;
    limit?: ITSRequireAtLeastOne<ITSPartialRecord<"id" | "config" | "ref", boolean>, "id" | "config" | "ref">;
}, "API" | "Gateway" | "limit">>;
export declare const ipfsServerList: Record<"infura.io" | "cloudflare", ITSRequireAtLeastOne<{
    API: IIPFSClientAddresses;
    Gateway: string;
    limit?: ITSRequireAtLeastOne<ITSPartialRecord<"id" | "config" | "ref", boolean>, "id" | "config" | "ref">;
}, "API" | "Gateway" | "limit">> & Record<string, ITSRequireAtLeastOne<{
    API: IIPFSClientAddresses;
    Gateway: string;
    limit?: ITSRequireAtLeastOne<ITSPartialRecord<"id" | "config" | "ref", boolean>, "id" | "config" | "ref">;
}, "API" | "Gateway" | "limit">>;
export default ipfsServerList;
