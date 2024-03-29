import { ITSRequireAtLeastOne, ITSPartialRecord } from 'ts-type';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
export type ILimit = ITSPartialRecord<'ref' | 'id' | 'config', boolean>;
export type IIPFSAddressesLikeBase = {
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
    IPNSDomain?: string;
    btfsGateway?: string;
};
export type IIPFSAddressesLike = ITSRequireAtLeastOne<IIPFSAddressesLikeBase> & {
    /**
     * @deprecated
     */
    limit?: ITSRequireAtLeastOne<ILimit>;
    name?: string;
    description?: string;
    disable?: ITSPartialRecord<keyof IIPFSAddressesLikeBase, boolean>;
};
export declare function getIpfsServerList(): Record<"ipfs" | "infura.io" | "infura-ipfs.io" | "cloudflare" | "cloudflare-ipfs" | "ipfs.gateway" | "dweb" | "fleek" | "bdaily" | "globalupload" | "pinata" | "hardbin" | "eternum" | "temporal" | "greyh" | "jorropo.net" | "jeroendeneef" | "2read" | "runfission" | "best-practice" | "trusti" | "dtube" | "dtube.2" | "cosmos-ink" | "cwinfo" | "doolta" | "originprotocol" | "mrh.io" | "ipns.co" | "blocksec" | "ninetailed.ninja" | "geesome-node" | "ipfs.yt" | "overpi" | "adatools.io" | "drink.cafe" | "robotizing.net" | "mihir.ch" | "telos.miami" | "tubby.cloud" | "kaleido.art" | "3cloud.ee" | "crustwebsites.net" | "textile.io" | "itargo.io" | "decoo.io" | "denarius.io" | "jbb.one" | "ravencoinipfs-gateway.com" | "trusted-setup.filecoin.io" | "eth.aragon.network" | "bluelight.link" | "birds-are-nice.me" | "smartholdem.io" | "astyanax.io" | "azurewebsites.net" | "slang.cx" | "video.oneloveipfs.com", IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>;
export declare function getIpfsLocalList(): Record<"go-ipfs" | "js-ipfs", IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>;
export declare function filterList<K extends keyof IIPFSAddressesLikeBase>(key: K, serverList?: Record<string, IIPFSAddressesLike>): IIPFSAddressesLike[K][];
export declare function isDisabled<T extends IIPFSAddressesLike>(data: T, key: keyof IIPFSAddressesLikeBase): boolean;
export declare const ipfsServerList: Record<"ipfs" | "infura.io" | "infura-ipfs.io" | "cloudflare" | "cloudflare-ipfs" | "ipfs.gateway" | "dweb" | "fleek" | "bdaily" | "globalupload" | "pinata" | "hardbin" | "eternum" | "temporal" | "greyh" | "jorropo.net" | "jeroendeneef" | "2read" | "runfission" | "best-practice" | "trusti" | "dtube" | "dtube.2" | "cosmos-ink" | "cwinfo" | "doolta" | "originprotocol" | "mrh.io" | "ipns.co" | "blocksec" | "ninetailed.ninja" | "geesome-node" | "ipfs.yt" | "overpi" | "adatools.io" | "drink.cafe" | "robotizing.net" | "mihir.ch" | "telos.miami" | "tubby.cloud" | "kaleido.art" | "3cloud.ee" | "crustwebsites.net" | "textile.io" | "itargo.io" | "decoo.io" | "denarius.io" | "jbb.one" | "ravencoinipfs-gateway.com" | "trusted-setup.filecoin.io" | "eth.aragon.network" | "bluelight.link" | "birds-are-nice.me" | "smartholdem.io" | "astyanax.io" | "azurewebsites.net" | "slang.cx" | "video.oneloveipfs.com", IIPFSAddressesLike> & Record<string, IIPFSAddressesLike>;
export default ipfsServerList;
