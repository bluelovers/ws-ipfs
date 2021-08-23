import { IPFS } from 'ipfs-core-types';
import Bluebird from 'bluebird';
import { AbortOptions } from 'ipfs-core-types/src/utils';
export declare function ipfsPubsubPeers(ipfs: Pick<IPFS, 'pubsub'>, topic: string, options?: AbortOptions): Promise<string[]>;
export declare function ipfsSwarmPeers(ipfs: Pick<IPFS, 'swarm'>, options?: AbortOptions): Promise<string[]>;
export declare function ipfsSwarmAddrsPeers(ipfs: Pick<IPFS, 'swarm'>, options?: AbortOptions): Promise<string[]>;
export declare function ipfsMixinPeers(ipfs: Pick<IPFS, 'swarm' | 'pubsub'>, topic?: string, options?: AbortOptions): Bluebird<string[]>;
