import { ITSPartialRecord } from 'ts-type';
import { IDagHashAlg } from '../types';
import { IIPFSAddresses, IIPFSExtendTypePick } from '../../index';
import { IPFS } from 'ipfs-core-types';
import { API as ConfigAPI } from 'ipfs-core-types/src/config';
import { AbortOptions } from 'ipfs-core-types/src/utils';
export type IPartialOrAny<T> = IPartial2<T> | any;
export type IPartial2<T> = Partial<T> & ITSPartialRecord<keyof T, any>;
export interface IConfigObject extends IPartial2<{
    Addresses: IIPFSAddresses;
    Discovery: {
        MDNS: {
            Enabled: boolean;
            Interval: number;
        };
        webRTCStar: {
            Enabled: boolean;
        };
    };
    Bootstrap: string[];
    Pubsub: {
        Router: string | 'gossipsub';
        Enabled: boolean;
    };
    Swarm: {
        ConnMgr: {
            LowWater: number;
            HighWater: number;
        };
    };
    Identity: {
        PeerID: string;
        PrivKey: string;
    };
    Keychain: IPartialOrAny<{
        dek: IPartialOrAny<{
            keyLength: number;
            iterationCount: number;
            salt: string;
            hash: string | IDagHashAlg;
        }>;
    }>;
    datastore: IPartialOrAny<{
        Spec: {
            type: string | 'mount';
            mounts: (any | {
                mountpoint: string;
                type: string | 'measure';
                prefix: string;
                child: {
                    type: string | 'flatfs';
                    path: string;
                    sync: boolean;
                    shardFunc: string;
                    compression?: undefined;
                };
            } | {
                mountpoint: string;
                type: string | 'measure';
                prefix: string;
                child: {
                    type: string | 'levelds';
                    path: string;
                    compression: string | 'none';
                    sync?: undefined;
                    shardFunc?: undefined;
                };
            })[];
        };
    }>;
}>, Record<string, any> {
}
export type IProfilesEntry = {
    name: 'server';
    description: 'Recommended for nodes with public IPv4 address (servers, VPSes, etc.), disables host and content discovery in local networks.';
} | {
    name: 'local-discovery';
    description: 'Sets default values to fields affected by `server` profile, enables discovery in local networks.';
} | {
    name: 'test';
    description: "Reduces external interference, useful for running ipfs in test environments. Note that with these settings node won't be able to talk to the rest of the network without manual bootstrap.";
} | {
    name: 'default-networking';
    description: 'Restores default network settings. Inverse profile of the `test` profile.';
} | {
    name: 'lowpower';
    description: 'Reduces daemon overhead on the system. May affect node functionality,performance of content discovery and data fetching may be degraded. Recommended for low power systems.';
} | {
    name: 'default-power';
    description: 'Inverse of "lowpower" profile.';
} | {
    name: string;
    description: string;
};
export interface IIPFSConfigApiCoreProfiles {
    /**
     * List available config profiles
     */
    list(options?: any): Promise<IProfilesEntry[]>;
    /**
     * Apply a config profile
     */
    apply(name: string | IProfilesEntry["name"], options?: {
        dryRun?: boolean;
    }): Promise<{
        original: IConfigObject;
        updated: IConfigObject;
    }>;
}
export type IIPFSConfigApiCore<OptionExtension = {}> = IPFS["config"] & ConfigAPI<OptionExtension> & {
    get<T>(key: string, options?: AbortOptions & OptionExtension): Promise<T>;
};
export type IIPFSConfigApi<OptionExtension = {}> = IIPFSExtendTypePick<'config', OptionExtension>;
