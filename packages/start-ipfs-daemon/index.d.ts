import Daemon from 'ipfs/src/cli/daemon';
export interface IOptions {
    initConfig?: Record<any, any>;
    initProfile?: Record<any, any>;
    daemonOptions?: Partial<IIPFSDaemonOptions>;
    enablePubsub?: boolean;
    enableNamesysPubsub?: boolean;
    enableDhtExperiment?: boolean;
    enableShardingExperiment?: boolean;
    enablePreload?: boolean;
    migrate?: boolean;
    /**
     * `.jsipfs`
     */
    repoPath?: string;
    disposable?: boolean;
}
export interface IIPFSDaemonOptions {
    config: any;
    silent?: boolean;
    repo: string;
    repoAutoMigrate?: boolean;
    offline?: boolean;
    pass?: any;
    preload?: {
        enabled?: boolean;
    };
    EXPERIMENTAL: {
        pubsub?: any;
        ipnsPubsub?: any;
        dht?: any;
        sharding?: any;
        [k: string]: any;
    };
    init: {
        profiles?: any;
    } | boolean;
}
export type IIPFSDaemon = Daemon;
export declare function getIPFSDaemonOptions(options?: IOptions): Partial<IIPFSDaemonOptions>;
/**
 * start js ipfs daemon
 */
export declare function startIPFSDaemon(options?: IOptions): IIPFSDaemon;
export default startIPFSDaemon;
