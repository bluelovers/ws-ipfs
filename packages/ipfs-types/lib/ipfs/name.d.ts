import { IApiOptions } from '../options';
export interface IIPFSNameApiCorePubsub {
    cancel(ipnsName: string): Promise<{
        canceled: boolean;
    }>;
    state(): Promise<{
        enabled: boolean;
    }>;
    subs(): Promise<string[]>;
}
export interface IIPFSNameApiCore {
    /**
     * Publish an IPNS name with a given value.
     */
    publish(multihash: string, options?: IApiOptions<{
        /**
         * Resolve given path before publishing. Default: true
         */
        resolve?: boolean;
        /**
         * Time duration of the record. Default: 24h
         */
        lifetime?: string;
        /**
         * Time duration this record should be cached
         */
        ttl?: string;
        /**
         * Name of the key to be used. Default: 'self'
         */
        key?: string;
        /**
         * When offline, save the IPNS record to the the local datastore without broadcasting to the network instead of simply failing.
         */
        allowOffline?: boolean;
    }>): Promise<{
        /**
         * 'Qmf3ySkYqLET9xtAtDzvAr5Pp3egK1H3C5iJAZm1SpLEp6'
         */
        name: string;
        /**
         * '/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
         */
        value: string;
    }>;
    pubsub: IIPFSNameApiCorePubsub;
    resolve(multihash: string, options?: IApiOptions<{
        recursive?: boolean;
        nocache?: boolean;
    }>): AsyncIterable<string>;
}
export interface IIPFSNameApi {
    /**
     * https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/SPEC/NAME.md
     */
    name: IIPFSNameApiCore;
}
