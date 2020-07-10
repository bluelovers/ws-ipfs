import { IIPFSFileApi } from './file';
import { IIPFSDagApi } from './dag';
import { IIPFSRefsApi } from './refs';
import { IIPFSObjectApi } from './object';
import { IIPFSConfigApi } from './config';
import { IIPFSNameApi } from './name';
import { IApiOptions } from '../options';
import { IIPFSFilesApi } from './files';
import { IIPFSSwarmApi } from './swarm';
import { IIPFSPubsubApi } from './pubsub';
import { IId, IVersion } from '../types';
export interface IIPFSApiReturnType {
    version: IVersion;
    id: IId;
    ping: {
        success: boolean;
        time: number;
        text: string;
    };
}
export interface IIPFSAsyncIterableApi extends IIPFSFileApi {
    /**
     * @example
     * for await (const res of ipfs.ping('Qmhash')) {
     * if (res.time) {
     * console.log(`Pong received: time=${res.time} ms`)
     * } else {
     * console.log(res.text)
     * }
}
     */
    ping(peerId: string, options?: IApiOptions<{
        count?: number;
    }>): AsyncIterable<IIPFSApiReturnType['ping']>;
}
export interface IIPFSApiUtils {
    version(options?: any): Promise<IIPFSApiReturnType['version']>;
    id(options?: any): Promise<IIPFSApiReturnType['id']>;
}
export interface IIPFSApiCtrl {
    start(): any;
    stop(): any;
}
export interface IIPFSPromiseApi extends IIPFSAsyncIterableApi, IIPFSApiUtils, IIPFSDagApi, IIPFSRefsApi, IIPFSObjectApi, IIPFSConfigApi, IIPFSNameApi, IIPFSFilesApi, IIPFSSwarmApi, IIPFSPubsubApi, IIPFSApiCtrl {
}
