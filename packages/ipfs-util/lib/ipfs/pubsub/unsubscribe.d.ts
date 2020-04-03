import { IIPFSPubsubApi } from 'ipfs-types/lib/ipfs/pubsub';
import Bluebird from 'bluebird';
export declare function unsubscribeAll(ipfs: IIPFSPubsubApi): Bluebird<void[]>;
