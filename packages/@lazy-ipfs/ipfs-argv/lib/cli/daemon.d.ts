export interface ISharedOptionsAndArgv {
    argv?: string[];
    silent?: boolean;
    offline?: boolean;
    pass?: string;
}
export interface IDaemonOptions extends ISharedOptionsAndArgv {
    repo?: string;
    repoAutoMigrate?: boolean;
    preload?: {
        enabled?: boolean;
    };
    EXPERIMENTAL?: {
        ipnsPubsub?: boolean;
        sharding?: boolean;
    };
    init?: boolean | {
        profiles?: boolean;
    };
}
export interface IDaemonArgv extends ISharedOptionsAndArgv {
    migrate?: boolean;
    enablePreload?: boolean;
    enableShardingExperiment?: boolean;
    enableNamesysPubsub?: boolean;
    initProfile?: boolean;
}
export declare const _OptionsAndArgvKeyMap: readonly [ipfsOptionsKey: string, argvOptionsKey: string][];
/**
 * @see https://github.com/ipfs/js-ipfs/blob/63d4d353c606e4fd487811d8a0014bb2173f11be/packages/ipfs/src/cli/commands/daemon.js#L48
 */
export declare function argv2opts<T extends IDaemonOptions>(argvOptions: IDaemonArgv, ipfsOptions?: T): T;
export declare function opts2argv<T extends IDaemonArgv>(ipfsOptions: IDaemonOptions, argvOptions?: T): T;
export declare function opts2cli(ipfsOptions: IDaemonOptions): string[];
export declare function argv2cli(argvOptions: IDaemonArgv): string[];
