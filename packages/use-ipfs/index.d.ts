export declare enum EnumIPFSType {
    Unknown = 0,
    Client = 1,
    Controller = 2
}
/**
 * check ipfs is work
 */
export declare function checkIPFS(ipfs: any): Promise<boolean>;
/**
 * get IPFS, if not exists, create or connect it
 */
export declare function useIPFS(options?: IOptions): Promise<Readonly<{
    ipfs: any;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
}>>;
export interface IOptions extends Record<string, any> {
    type?: string;
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
    };
    disposable?: boolean;
}
export declare function fixIPFSOptions(options?: IOptions): IOptions;
/**
 * create or connect it
 */
export declare function getIPFS(options?: IOptions): Promise<Readonly<{
    ipfs: any;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
}>>;
export default useIPFS;
