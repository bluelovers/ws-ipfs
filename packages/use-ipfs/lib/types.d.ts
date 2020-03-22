import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
export declare enum EnumIPFSType {
    Unknown = 0,
    Client = 1,
    Controller = 2,
    ClientFallback = 3
}
export interface IOptionsExtra {
    /**
     * when use this, will skip check server is work or not
     */
    fallbackServer?: IIPFSClientAddresses;
    useFallbackFirst?: boolean;
    skipCheck?: boolean;
    serverAddr?: IIPFSClientAddresses;
    skipClose?: boolean;
}
export interface IOptions extends Record<string, any> {
    type?: string | 'js' | 'go' | 'proc';
    ipfsModule?: any;
    ipfsHttpModule?: any;
    ipfsBin?: string;
    ipfsOptions?: {
        EXPERIMENTAL?: {
            pubsub?: boolean;
            ipnsPubsub?: boolean;
            sharding?: boolean;
            dht?: boolean;
        };
        relay?: {
            enabled?: boolean;
            hop?: {
                enabled?: boolean;
            };
        };
        [k: string]: any;
    };
    disposable?: boolean;
}
